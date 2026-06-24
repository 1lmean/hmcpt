# 04_search.py
import chromadb
from sentence_transformers import SentenceTransformer
import anthropic
from dotenv import load_dotenv

load_dotenv()

# 임베딩할 때랑 같은 모델 써야 함 (중요!)
model = SentenceTransformer("jhgan/ko-sroberta-multitask")
claude_client = anthropic.Anthropic()
chroma = chromadb.PersistentClient(path="./chroma_db")
collection = chroma.get_collection("cases")


def search_similar_cases(my_situation: str, n: int = 3) -> list:
    query_vector = model.encode(my_situation).tolist()

    results = collection.query(query_embeddings=[query_vector], n_results=n)

    return results["documents"][0]


def ask_claude(my_situation: str, similar_cases: list) -> str:
    context = "\n\n---\n\n".join(similar_cases)

    message = claude_client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1000,
        messages=[
            {
                "role": "user",
                "content": f"""
다음은 유사한 교통사고 판례들이야:

{context}

내 상황:
{my_situation}

위 판례들을 참고해서:
1. 예상 과실 비율
2. 근거가 된 판례
3. 주의할 점
을 알려줘.
""",
            }
        ],
    )
    return message.content[0].text

if __name__ == "__main__":
    my_situation = "비오는 날 커브길에서 급제동하다 중앙선 침범해서 사고남."

    cases = search_similar_cases(my_situation)
    answer = ask_claude(my_situation, cases)
    print(answer)
