import uuid
from datetime import datetime

from sqlalchemy import String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID

from app.db.base import Base


class ConversionJob(Base):
    __tablename__ = "conversion_jobs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    file_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("files.id"), nullable=False)
    target_format: Mapped[str] = mapped_column(String(20), nullable=False)  # docx, pptx, xlsx, png, jpg, txt...
    operation: Mapped[str] = mapped_column(String(20), default="convert")  # convert, merge, split, compress, ocr
    status: Mapped[str] = mapped_column(String(20), default="queued")  # queued, processing, done, failed
    output_path: Mapped[str | None] = mapped_column(String(1024), nullable=True)
    error_message: Mapped[str | None] = mapped_column(String(1024), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    source_file: Mapped["File"] = relationship(back_populates="jobs")
