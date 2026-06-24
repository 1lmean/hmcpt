# scripts/collect.py
import time, os, re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager

def get_driver():
    options = webdriver.ChromeOptions()
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    return webdriver.Chrome(
        service=Service(ChromeDriverManager().install()),
        options=options
    )

def collect_search_results(keyword: str = "교통사고 과실", max_pages: int = 3):
    driver = get_driver()
    wait = WebDriverWait(driver, 10)
    os.makedirs("data/cases", exist_ok=True)
    saved = 0

    driver.get("https://portal.scourt.go.kr/pgp/index.on?m=PGP1011M01&l=N&c=900")
    time.sleep(2)

    # 검색어 입력
    search_box = wait.until(EC.presence_of_element_located(
        (By.CSS_SELECTOR, "input[placeholder='검색어를 입력해주세요']")
    ))
    search_box.click()
    search_box.send_keys(keyword)
    search_box.send_keys(Keys.ENTER)
    time.sleep(3)

    print(f"🔍 '{keyword}' 검색 완료")
    main_window = driver.current_window_handle

    for page in range(1, max_pages + 1):
        print(f"\n📄 {page}페이지 수집 중...")

        titles = driver.find_elements(By.CSS_SELECTOR, ".w2anchor.infoTit a")
        print(f"  → {len(titles)}개 항목 발견")

        for i in range(len(titles)):
            try:
                # 매번 새로 찾기
                titles = driver.find_elements(By.CSS_SELECTOR, ".w2anchor.infoTit a")
                titles[i].click()
                time.sleep(2)

                # 새창 전환
                new_window = [w for w in driver.window_handles if w != main_window]
                if not new_window:
                    print(f"  ❌ 새창 없음")
                    continue
                driver.switch_to.window(new_window[0])
                time.sleep(2)

                # ── 사건번호 추출 ──
                # <h3 id="...tbx_title">대법원 1988. 5. 24. 선고 88도255 판결</h3>
                try:
                    title_text = driver.find_element(
                        By.CSS_SELECTOR, "h3[id*='tbx_title']"
                    ).text.replace("\xa0", " ")  # &nbsp; 제거
                    match = re.search(r'선고\s+(\S+)\s+판결', title_text)
                    case_id = match.group(1) if match else f"unknown_{saved}"
                except Exception as e:
                    print(f"  ⚠️ 사건번호 추출 실패: {e}")
                    case_id = f"unknown_{saved}"

                # ── 전문 탭 클릭 ──
                # <input value="전문" id="...gen_jdcpctDtlTab_4_btn_jdcpctDtlTab">
                try:
                    fulltext_btn = wait.until(EC.element_to_be_clickable(
                        (By.CSS_SELECTOR, "input[id*='jdcpctDtlTab'][value='전문']")
                    ))
                    driver.execute_script("arguments[0].click();", fulltext_btn)
                    time.sleep(2)
                except Exception as e:
                    print(f"  ⚠️ 전문 탭 클릭 실패: {e}")

                # ── 본문 추출 ──
                # <div id="...tbx_orgdocXmlCtt" class="w2textbox orgdocXmlCtt">
                try:
                    content = driver.find_element(
                        By.CSS_SELECTOR, "div[id*='tbx_orgdocXmlCtt']"
                    ).text.strip()
                except Exception as e:
                    print(f"  ⚠️ 본문 추출 실패: {e}")
                    content = ""

                if content and len(content) > 200:
                    filepath = f"data/cases/{case_id}.txt"
                    with open(filepath, "w", encoding="utf-8") as f:
                        f.write(content)
                    print(f"  ✅ {case_id} ({len(content)}자)")
                    saved += 1
                else:
                    print(f"  ⚠️ {case_id} 본문 없음 or 너무 짧음")

                # 새창 닫고 메인 복귀
                driver.close()
                driver.switch_to.window(main_window)
                time.sleep(1)

            except Exception as e:
                print(f"  ❌ {i+1}번째 실패: {e}")
                for w in driver.window_handles:
                    if w != main_window:
                        driver.switch_to.window(w)
                        driver.close()
                driver.switch_to.window(main_window)
                time.sleep(1)

        # 다음 페이지
        try:
            next_btn = driver.find_element(
                By.CSS_SELECTOR, "li[id*='next_btn'] button"
            )
            # 비활성화 확인 (마지막 페이지면 disabled)
            parent = driver.find_element(By.CSS_SELECTOR, "li[id*='next_btn']")
            if "disabled" in parent.get_attribute("class") or not parent.is_enabled():
                print("마지막 페이지")
                break
            driver.execute_script("arguments[0].click();", next_btn)
            time.sleep(2)
        except:
            print("마지막 페이지")
            break

    driver.quit()
    print(f"\n✅ 총 {saved}개 수집 완료!")

if __name__ == "__main__":
    keywords = [
        "교통사고 과실",
        "교통사고 차선변경",
        "교통사고 신호위반",
        "교통사고 횡단보도",
        "교통사고 후방추돌",
        "교통사고 음주운전",
        "교통사고 중앙선침범",
    ]

    for kw in keywords:
        print(f"\n\n{'='*40}")
        print(f"🔍 키워드: {kw}")
        print(f"{'='*40}")
        collect_search_results(keyword=kw, max_pages=100)
        time.sleep(3)