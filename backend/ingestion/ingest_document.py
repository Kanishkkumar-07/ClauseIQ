from ingestion.table_normalizer import table_to_text
import fitz


def ingest_pdf(pdf_path: str):

    file = fitz.open(pdf_path)

    final_document = ""

    for page in file:

        tables = page.find_tables()

        if len(tables.tables) != 0:

            for table in tables.tables:

                table_data = table.extract()

                final_document += table_to_text(
                    table_data
                )

            final_document += page.get_text()

        else:

            final_document += page.get_text()

    return final_document