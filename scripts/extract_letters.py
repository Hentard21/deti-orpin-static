import pdfplumber, json, re, sys
sys.stdout.reconfigure(encoding='utf-8')

PDF_PATH = r"f:\Deti\public\MemoryLatters.pdf"
OUT_PATH = r"f:\Deti\src\data\letters.json"

import os; os.makedirs(r"f:\Deti\src\data", exist_ok=True)

letters = []

HERO_RE = re.compile(r'^(МОЙ ОТЕЦ|НАШ ОТЕЦ|МОЯ МАМА|НАША МАМА|МОЙ ПАПА|НАШ ПАПА|МОЙ ДЕДУШКА)\s+(.+)$', re.IGNORECASE)

with pdfplumber.open(PDF_PATH) as pdf:
    total = len(pdf.pages)
    print(f"Всего страниц: {total}")

    for i, page in enumerate(pdf.pages):
        text = (page.extract_text() or "").strip()
        if len(text) < 10:
            continue

        lines = [l.strip() for l in text.splitlines() if l.strip() and l.strip() != '- ‹#› -']

        if not lines:
            continue

        # Проверяем первую строку на паттерн заголовка письма
        m = HERO_RE.match(lines[0])
        if m:
            relation = m.group(1).strip()   # "МОЙ ОТЕЦ"
            hero_name = m.group(2).strip()  # "АЛЕКСЕЙ"

            child_names = lines[1] if len(lines) > 1 else ""
            region = lines[2] if len(lines) > 2 else ""
            city = lines[3] if len(lines) > 3 else ""

            letters.append({
                "id": len(letters) + 1,
                "page": i + 1,
                "relation": relation,
                "heroName": hero_name,
                "childNames": child_names,
                "region": region,
                "city": city,
            })

print(f"\nИзвлечено писем: {len(letters)}")
print(f"\nПервые 5:")
for l in letters[:5]:
    print(f"  [{l['id']}] {l['relation']} {l['heroName']} | {l['childNames']} | {l['city']}, {l['region']}")

print(f"\nПоследние 5:")
for l in letters[-5:]:
    print(f"  [{l['id']}] {l['relation']} {l['heroName']} | {l['childNames']} | {l['city']}, {l['region']}")

# Статистика городов
from collections import Counter
cities = Counter(l['city'] for l in letters if l['city'])
print(f"\nТоп-10 городов:")
for city, count in cities.most_common(10):
    print(f"  {city}: {count}")

with open(OUT_PATH, "w", encoding="utf-8") as f:
    json.dump(letters, f, ensure_ascii=False, indent=2)
print(f"\nСохранено: {OUT_PATH}")
