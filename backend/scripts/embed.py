# 02_embed.py
import os
import chromadb
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

load_dotenv()

# 한국어 특화 임베딩 모델 (무료, 로컬 실행)
model = SentenceTransformer("jhgan/ko-sroberta-multitask")

chroma = chromadb.PersistentClient(path="./chroma_db")
collection = chroma.get_or_create_collection("cases")


def chunk_case(text: str) -> list[str]:
    sections = ["【사실관계】", "【쟁점】", "【판시사항】", "【결론】"]
    chunks = []

    for i, section in enumerate(sections):
        start = text.find(section)
        end = text.find(sections[i + 1]) if i + 1 < len(sections) else len(text)
        if start != -1:
            chunks.append(text[start:end].strip())

    if not chunks:
        chunks = [text[i : i + 500] for i in range(0, len(text), 500)]

    return chunks


def embed_text(text: str) -> list[float]:
    """
    OpenAI 대신 로컬 한국어 모델 사용
    비용 0원, 인터넷 없어도 됨
    """
    return model.encode(text).tolist()


# 저장된 판례 파일 전부 임베딩
for filename in os.listdir("data/cases"):
    case_id = filename.replace(".txt", "")

    with open(f"data/cases/{filename}") as f:
        text = f.read()

    chunks = chunk_case(text)

    for i, chunk in enumerate(chunks):
        vector = embed_text(chunk)

        collection.add(
            ids=[f"{case_id}_chunk_{i}"],
            embeddings=[vector],
            documents=[chunk],
            metadatas=[{"case_id": case_id, "chunk_index": i}],
        )

    print(f"임베딩 완료: {case_id} ({len(chunks)}개 청크)")
