# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import chromadb
from sentence_transformers import SentenceTransformer
import anthropic
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 모델 / DB 초기화 (서버 시작 시 한 번만)
model = SentenceTransformer("jhgan/ko-sroberta-multitask")
chroma = chromadb.PersistentClient(path="./chroma_db")
collection = chroma.get_collection("cases")
claude = anthropic.Anthropic()


# ── 요청/응답 스키마 ──
class Message(BaseModel):
    role: str   # "user" | "assistant"
    content: str

class ChatRequest(BaseModel):
    messages: list[Message]  # 전체 대화 히스토리


# ── 엔드포인트 ──
@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/chat")

# def chat(req: ChatRequest):
#     # 마지막 유저 메시지로 판례 검색
#     last_user = next(
#         (m.content for m in reversed(req.messages) if m.role == "user"),
#         ""
#     )

#     # RAG: 유사 판례 검색
#     query_vector = model.encode(last_user).tolist()
#     results = collection.query(query_embeddings=[query_vector], n_results=3)
#     similar_cases = results["documents"][0]
#     context = "\n\n---\n\n".join(similar_cases)

#     # 대화 히스토리 + 판례 컨텍스트 → Claude
#     system_prompt = f"""
# 너는 교통사고 과실비율 분석 전문가야.
# 아래 판례들을 참고해서 사용자 질문에 답해줘.
# 법적 효력이 없음을 항상 명시해.

# [참고 판례]
# {context}
# """

#     response = claude.messages.create(
#         model="claude-sonnet-4-6",
#         max_tokens=1000,
#         system=system_prompt,
#         messages=[{"role": m.role, "content": m.content} for m in req.messages]
#     )

#     return {
#         "answer": response.content[0].text,
#         "cases_used": len(similar_cases)
#     }

def chat(req: ChatRequest):
    last_user = next(
        (m.content for m in reversed(req.messages) if m.role == "user"),
        ""
    )

    query_vector = model.encode(last_user).tolist()
    results = collection.query(query_embeddings=[query_vector], n_results=3)
    similar_cases = results["documents"][0]

    # 임시 mock 응답 (크레딧 충전 후 교체)
    return {
        "answer": f"[mock] '{last_user}' 관련 판례 {len(similar_cases)}건 검색됨. API 크레딧 충전 후 실제 분석 제공 예정.",
        "cases_used": len(similar_cases)
    }