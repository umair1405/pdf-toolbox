
import app.models

from datetime import datetime
from pathlib import Path

from app.core.celery_app import celery_app
from app.db.session import SessionLocal
from app.models.conversion_job import ConversionJob
from app.models.file import File as FileModel
from app.services.storage import storage_service

from app.converters.pdf_to_word import pdf_to_word
from app.converters.word_to_pdf import word_to_pdf
from app.converters.merge_pdf import merge_pdfs
from app.converters.split_pdf import split_pdf
from app.converters.compress_pdf import compress_pdf
from app.converters.ocr_pdf import ocr_pdf
from app.converters.pdf_to_image import pdf_to_image
from app.converters.pdf_to_ppt import pdf_to_ppt
from app.converters.pdf_to_xlsx import pdf_to_xlsx
from app.converters.pdf_to_txt import pdf_to_txt

@celery_app.task(name="convert_file_task", bind=True, max_retries=1)
def convert_file_task(self, job_id: str) -> None:
    db = SessionLocal()
    try:
        job = db.query(ConversionJob).filter(ConversionJob.id == job_id).first()
        if not job:
            return

        job.status = "processing"
        db.commit()

        source = db.query(FileModel).filter(FileModel.id == job.file_id).first()

        print("JOB STARTED:", job_id)
        print("Operation:", job.operation)
        print("Target:", job.target_format)

        if not source:
            raise RuntimeError("Source file no longer exists")

        print("Source:", source.stored_path)

        suggested_name = f"{Path(source.original_filename).stem}.{job.target_format}"
        output_dir = str(Path(source.stored_path).parent.parent / "outputs")

        if job.operation == "convert" and job.target_format == "docx":
            out_path = storage_service.output_path(suggested_name)
            pdf_to_word(source.stored_path, out_path)

        elif job.operation == "convert" and job.target_format == "pptx":
         out_path = pdf_to_ppt(
            source.stored_path,
            output_dir,
          ) 
         
        elif job.operation == "convert" and job.target_format == "xlsx":
            out_path = storage_service.output_path(
                f"{Path(source.original_filename).stem}.xlsx"
            )

            pdf_to_xlsx(
                source.stored_path,
                out_path
            )  
        elif job.operation == "convert" and job.target_format == "txt":

            out_path = storage_service.output_path(
                f"{Path(source.original_filename).stem}.txt"
            )

            pdf_to_txt(
                source.stored_path,
                out_path
            )
        elif job.operation == "convert" and job.target_format in ("png", "jpg"):
            out_path = pdf_to_image(
                source.stored_path,
                output_dir,
                fmt=job.target_format,
            )

        elif job.operation == "convert" and job.target_format == "pdf":
            # word/ppt/xlsx -> pdf
            out_path = word_to_pdf(source.stored_path, output_dir)

        elif job.operation == "merge":
            extra_ids = (
                job.options.get("file_ids", [])
                if hasattr(job, "options")
                else []
            )

            paths = [source.stored_path] + extra_ids
            out_path = storage_service.output_path("merged.pdf")
            merge_pdfs(paths, out_path)

        elif job.operation == "split":
            out_path = split_pdf(source.stored_path, output_dir)

        elif job.operation == "compress":
            out_path = storage_service.output_path(
                f"compressed_{Path(source.original_filename).name}"
            )
            compress_pdf(source.stored_path, out_path)

        elif job.operation == "ocr":
            out_path = storage_service.output_path(
                f"ocr_{Path(source.original_filename).name}"
            )
            ocr_pdf(source.stored_path, out_path)

        

        else:
            raise RuntimeError(
                f"Unsupported operation/target combination: "
                f"{job.operation}/{job.target_format}"
            )

        print("OUTPUT:", out_path)

        job.output_path = out_path
        job.status = "done"
        job.completed_at = datetime.utcnow()

        db.commit()

    except Exception as exc:
        print("ERROR:", str(exc))

        db.rollback()

        job = (
            db.query(ConversionJob)
            .filter(ConversionJob.id == job_id)
            .first()
        )

        if job:
            job.status = "failed"
            job.error_message = str(exc)[:1000]
            job.completed_at = datetime.utcnow()
            db.commit()

    finally:
        db.close()