from pathlib import Path 
import re
from langchain_text_splitters import RecursiveCharacterTextSplitter

file_path = Path(__file__).parent / "final_document.txt"

with open(file_path, "r", encoding = "utf-8") as f:
    text = f.read()

sections = re.findall(r'^\d+.\s.*?(?=^\d+.\s|\Z)', text, re.MULTILINE | re.DOTALL)

text_splitter = RecursiveCharacterTextSplitter(chunk_size = 1000, chunk_overlap = 200)

chunks = []
chunk_id = 1

for sectionid, section in enumerate(sections):
    if(len(section) <= 1000):
        chunks.append({
            "chunk_id": chunk_id,
            "section_id": sectionid + 1,
            "chunk_type": "section",
            "content": section
        })
        chunk_id += 1
    else:
        sub_chunks = text_splitter.split_text(section)
        for sub_chunk in enumerate(sub_chunks):
            chunks.append({
                "chunk_id": chunk_id,
                "section_id": sectionid + 1,
                "chunk_type": "section",
                "content": sub_chunk
            })
            chunk_id += 1
