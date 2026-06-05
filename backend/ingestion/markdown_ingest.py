import pymupdf4llm
from ingestion.structure_chunker import create_chunks

def pdf_to_markdown(pdf_path):

    markdown = pymupdf4llm.to_markdown(str(pdf_path))

    return markdown
