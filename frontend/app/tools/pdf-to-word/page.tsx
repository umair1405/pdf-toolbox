import FileUpload
from "../../../components/upload/FileUpload";

export default function Page() {
  return (
    <main>

      <h1 className="text-5xl text-center mt-20">
        PDF → WORD
      </h1>

      <FileUpload
        endpoint="/api/v1/convert/pdf-to-word"
      />

    </main>
  );
}