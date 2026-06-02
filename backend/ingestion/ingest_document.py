from pdf_loader import extract_text_from_pdf
from table_normalizer import table_to_text
from pathlib import Path 
import fitz

pdf_path = Path(__file__).parent/ "Microsoft-TC.pdf"

file = fitz.open(pdf_path)

final_document = ""

for page in file:
    table = page.find_tables()
    if len(table.tables) != 0:
        for table in table.tables :
            table_data = table.extract()
            final_document += table_to_text(table_data)
            
    else:
        final_document += page.get_text()
