import fitz
from pathlib import Path

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

if __name__ == "__main__":
    pdf_file = Path(__file__).parent / "Microsoft-TC.pdf"
    extracted_text = extract_text_from_pdf(pdf_file)
    with open("extracted_text.txt", "w", encoding="utf-8") as f:
        f.write(extracted_text)
    
    