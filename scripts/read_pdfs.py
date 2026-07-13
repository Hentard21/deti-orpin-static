import pdfplumber, sys, os
sys.stdout.reconfigure(encoding='utf-8')

folder = r"f:\Deti\public\AdinaFiles"
pdfs = [f for f in os.listdir(folder) if f.endswith('.pdf')]

for name in sorted(pdfs):
    path = os.path.join(folder, name)
    try:
        with pdfplumber.open(path) as pdf:
            text = ""
            for page in pdf.pages[:2]:
                t = page.extract_text() or ""
                text += t + "\n"
            text = text.strip()[:600]
            print(f"\n{'='*60}")
            print(f"ФАЙЛ: {name}")
            print(f"Страниц: {len(pdf.pages)}")
            print(f"ТЕКСТ:\n{text}")
    except Exception as e:
        print(f"\n[ОШИБКА] {name}: {e}")
