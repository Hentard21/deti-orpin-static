import pdfplumber
import json
import os

PDF_PATH = r"f:\Deti\public\MemoryLatters.pdf"

with pdfplumber.open(PDF_PATH) as pdf:
    total = len(pdf.pages)
    print(f"Всего страниц: {total}")
    print(f"Есть изображения на стр. 1: {len(pdf.pages[0].images) > 0}")
    print("=" * 60)

    # Первые 5 страниц — смотрим структуру
    for i in range(min(5, total)):
        page = pdf.pages[i]
        text = page.extract_text() or ""
        imgs = page.images
        print(f"\n--- Страница {i+1} ---")
        print(f"  Текст ({len(text)} симв.): {text[:300]!r}")
        print(f"  Изображений: {len(imgs)}")

    print("\n" + "=" * 60)
    # Подсчёт: сколько страниц содержат текст / только картинки
    text_pages = 0
    image_only_pages = 0
    mixed_pages = 0
    sample_texts = []

    for i, page in enumerate(pdf.pages):
        text = (page.extract_text() or "").strip()
        imgs = page.images
        has_text = len(text) > 30
        has_img = len(imgs) > 0
        if has_text and has_img:
            mixed_pages += 1
        elif has_text:
            text_pages += 1
        else:
            image_only_pages += 1
        if has_text and len(sample_texts) < 3:
            sample_texts.append({"page": i+1, "text": text[:500]})

    print(f"\nТолько текст:    {text_pages} стр.")
    print(f"Текст + картинки:{mixed_pages} стр.")
    print(f"Только картинки: {image_only_pages} стр.")
    print("\nПримеры текстовых страниц:")
    for s in sample_texts:
        print(f"\n  [стр. {s['page']}]: {s['text'][:400]}")
