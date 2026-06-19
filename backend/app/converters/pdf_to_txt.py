# app/converters/pdf_to_txt.py

import pdfplumber
from pathlib import Path


def pdf_to_txt(input_path: str, output_path: str):

    output_path = str(output_path)

    all_text = []

    with pdfplumber.open(input_path) as pdf:

        for page_no, page in enumerate(pdf.pages):

            text = page.extract_text(
                x_tolerance=2,
                y_tolerance=3
            )

            if text:

                all_text.append(
                    f"\n----- PAGE {page_no+1} -----\n"
                )

                all_text.append(text)

            else:

                words = page.extract_words()

                if words:

                    page_text = ""

                    previous_y = None

                    for word in words:

                        current_y = round(word["top"])

                        if (
                            previous_y is not None
                            and abs(current_y - previous_y) > 5
                        ):
                            page_text += "\n"

                        page_text += word["text"] + " "

                        previous_y = current_y

                    all_text.append(
                        f"\n----- PAGE {page_no+1} -----\n"
                    )

                    all_text.append(page_text)

    Path(output_path).write_text(
        "\n".join(all_text),
        encoding="utf-8"
    )

    return output_path