import re
from langchain_text_splitters import RecursiveCharacterTextSplitter


def create_chunks(text: str):

    sections = re.findall(
        r'^\d+\.\s.*?(?=^\d+\.\s|\Z)',
        text,
        re.MULTILINE | re.DOTALL
    )

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )

    chunks = []
    chunk_id = 1

    for section_id, section in enumerate(sections, start=1):

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
                    "chunk_type": "section",
                    "content": sub_chunk
                })

                chunk_id += 1

    return chunks


if __name__ == "__main__":

    with open(
        "final_document.txt",
        "r",
        encoding="utf-8"
    ) as f:

        text = f.read()

    chunks = create_chunks(text)

    print(f"Total chunks: {len(chunks)}")