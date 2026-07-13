import pdfplumber, sys
sys.stdout.reconfigure(encoding='utf-8')

PDF_PATH = r"f:\Deti\public\MemoryLatters.pdf"

with pdfplumber.open(PDF_PATH) as pdf:
    # Показываем первые строки каждой страницы с текстом (первые 20 таких страниц)
    shown = 0
    for i, page in enumerate(pdf.pages):
        text = (page.extract_text() or "").strip()
        if len(text) > 30:
            lines = [l.strip() for l in text.splitlines() if l.strip()]
            print(f"\n=== Стр.{i+1} | {len(lines)} строк | {len(page.images)} фото ===")
            for line in lines[:6]:
                print(f"  {line!r}")
            shown += 1
            if shown >= 20:
                break
