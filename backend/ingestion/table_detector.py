import fitz  
from pathlib import Path
from table_normalizer import table_to_text

pdf_path = Path(__file__).parent / "Microsoft-TC.pdf"

doc = fitz.open(pdf_path)

for page_num, page in enumerate(doc):
    
    tables = page.find_tables()

    for table in tables:
        table_data = table.extract()
        text_output = table_to_text(table_data)
        print(text_output)

