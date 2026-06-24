# 03_generate_note.py
import anthropic, os
from dotenv import load_dotenv

load_dotenv()
client = anthropic.Anthropic()

PROMPT_TEMPLATE = """
다음 교통사고 판례를 분석해서 옵시디언 마크다운 노트로 만들어줘.

판례 원문:
{case_text}

아래 형식을 정확히 따라줘:

---
tags: [교통사고, {tags}]
법원: 
선고일: 
사건번호: 
과실비율: 
---

## 사실관계
(3-4줄 요약)

## 핵심 쟁점
(bullet point 2-3개)

## 판시사항
(법원이 판단한 내용)

## 과실 비율
- 원고: %
- 피고: %
- 근거: 

## 의의
(이 판례가 중요한 이유 2줄)

## 관련 판례
아래 목록 중에서만 골라서 링크 걸어줘 (관련 없으면 생략):
{existing_case_ids}
- [[사건번호]] 형식으로만 작성
"""

def generate_note(case_id: str, case_text: str, existing_case_ids: str) -> str:
    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1500,
        messages=[{
            "role": "user",
            "content": PROMPT_TEMPLATE.format(
                case_text=case_text,
                tags="신호위반",
                existing_case_ids=existing_case_ids,  # ← 추가
            ),
        }],
    )
    return message.content[0].text


# 실행
os.makedirs("vault/cases", exist_ok=True)

# vault에 있는 판례 목록 미리 수집
existing_cases = [f.replace(".md", "") for f in os.listdir("vault/cases") if f.endswith(".md")]
existing_case_ids = "\n".join([f"- {c}" for c in existing_cases])

for filename in os.listdir("data/cases"):
    case_id = filename.replace(".txt", "")

    with open(f"data/cases/{filename}") as f:
        text = f.read()

    note = generate_note(case_id, text, existing_case_ids)

    with open(f"vault/cases/{case_id}.md", "w") as f:
        f.write(note)

    print(f"노트 생성: {case_id}.md")