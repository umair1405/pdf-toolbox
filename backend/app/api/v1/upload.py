from fastapi import APIRouter, Depends, UploadFile, File as FastAPIFile, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.api.deps import get_current_user_optional
from app.core.config import settings
from app.models.file import File as FileModel
from app.models.user import User
from app.schemas.conversion import FileOut
from app.services.storage import storage_service

router = APIRouter(prefix="/upload", tags=["upload"])

ALLOWED_MIME_PREFIXES = ("application/pdf", "application/vnd.openxmlformats", "application/msword")


@router.post("", response_model=FileOut)
async def upload_file(
    file: UploadFile = FastAPIFile(...),
    db: Session = Depends(get_db),
    current_user: User | None = Depends(get_current_user_optional),
):
    if file.content_type not in ALLOWED_MIME_PREFIXES and not file.content_type.startswith("application/vnd"):
        raise HTTPException(status_code=415, detail="Unsupported file type")

    stored_path, size = storage_service.save_upload(file)

    max_bytes = settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024
    if size > max_bytes:
        storage_service.delete(stored_path)
        raise HTTPException(status_code=413, detail=f"File exceeds the {settings.MAX_UPLOAD_SIZE_MB}MB limit")

    db_file = FileModel(
        owner_id=current_user.id if current_user else None,
        original_filename=file.filename,
        stored_path=stored_path,
        mime_type=file.content_type,
        size_bytes=size,
    )
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    return db_file
