import re
from langchain_text_splitters import RecursiveCharacterTextSplitter


def create_chunks(markdown: str):

    sections = re.split(
        r'(?=^#{1,6}\s)',
        markdown,
        flags=re.MULTILINE
    )

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )

    chunks = []
    chunk_id = 1

    for section_id, section in enumerate(
        sections,
        start=1
    ):

        section = section.strip()

        if not section:
            continue

        if len(section) <= 1000:

            chunks.append({
                "chunk_id": chunk_id,
                "section_id": section_id,
                "chunk_type": "section",
                "content": section
            })

            chunk_id += 1

        else:

            sub_chunks = text_splitter.split_text(
                section
            )

            for sub_chunk in sub_chunks:

                chunks.append({
                    "chunk_id": chunk_id,
                    "section_id": section_id,
                    "chunk_type": "sub_section",
                    "content": sub_chunk
                })

                chunk_id += 1

    return chunks


if __name__ == "__main__":

    from ingestion.markdown_ingest import (
        pdf_to_markdown
    )

    markdown = pdf_to_markdown(
        "uploads/TermsandConditionsofSale.pdf"
    )

    chunks = create_chunks(
        markdown
    )

    print(f"Total chunks: {len(chunks)}")

    print("\nFirst Chunk:\n")
    print(chunks[0]["content"][:1000])