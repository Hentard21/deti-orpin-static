'use client';

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import {
  Video, Palette, Upload, X, CheckCircle,
  AlertCircle, ArrowLeft, Loader2, FileVideo, FileImage, FileText,
} from 'lucide-react';

// ─── FormSpree endpoint for contest submissions ───────────────────────────────
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xovqqapp';
// ──────────────────────────────────────────────────────────────────────────────

const nominations = [
  { value: 'video',   label: 'Лучшее видео',   icon: <Video size={18} />,    accept: 'video/mp4,video/quicktime,video/x-msvideo', hint: 'MP4, MOV, AVI · до 500 МБ' },
  { value: 'drawing', label: 'Лучший рисунок',  icon: <Palette size={18} />,  accept: 'image/jpeg,image/png,image/webp',           hint: 'JPG, PNG · до 20 МБ' },
  { value: 'story',   label: 'Лучший рассказ',  icon: <FileText size={18} />, accept: '.pdf,.docx,.doc',                           hint: 'PDF, DOCX · до 10 МБ' },
];

type Status = 'idle' | 'loading' | 'success' | 'error';

function FileIcon({ type }: { type: string }) {
  if (type.startsWith('video/'))  return <FileVideo  size={20} className="text-crimson-600" />;
  if (type.startsWith('image/'))  return <FileImage  size={20} className="text-gold-500" />;
  return <FileText size={20} className="text-navy-200" />;
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}

export default function ApplyPage() {
  const [nomination, setNomination] = useState('');
  const [file, setFile]             = useState<File | null>(null);
  const [dragging, setDragging]     = useState(false);
  const [status, setStatus]         = useState<Status>('idle');
  const [errorMsg, setErrorMsg]     = useState('');
  const fileInputRef                = useRef<HTMLInputElement>(null);

  const currentNom = nominations.find(n => n.value === nomination);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) setFile(dropped);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);
    if (file) data.set('file', file, file.name);

    // Таймаут 60 сек — форма не зависает в состоянии загрузки навсегда
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60_000);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
        setFile(null);
        setNomination('');
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMsg(json?.error || 'Ошибка отправки. Попробуйте позже.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Нет соединения с сервером. Проверьте интернет.');
      setStatus('error');
    } finally {
      clearTimeout(timeout);
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-lg w-full text-center space-y-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
            style={{ background: 'linear-gradient(135deg, #b71c1c, #c9a227)' }}>
            <CheckCircle size={40} className="text-white" />
          </div>
          <h2 className="font-heading text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Заявка отправлена!
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Спасибо за участие. Мы получили вашу работу и свяжемся с вами
            по указанному email в течение 5 рабочих дней.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/creativity/contests"
              className="px-6 py-3 rounded-lg font-bold bg-crimson-600 text-white hover:bg-crimson-700 transition-colors">
              К конкурсам
            </Link>
            <Link href="/"
              className="px-6 py-3 rounded-lg font-bold border-2 transition-colors"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
              На главную
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* Hero */}
      <section className="hero-section hero-bg pt-20 pb-14">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-5">
            <Link href="/creativity/contests"
              className="inline-flex items-center gap-2 text-sm transition-colors hover:text-crimson-500"
              style={{ color: 'var(--text-muted)' }}>
              <ArrowLeft size={16} /> Назад к конкурсам
            </Link>
            <div className="label-dark">Заявка на участие</div>
            <h1 className="font-heading text-3xl md:text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Подать работу<br />
              <span className="text-crimson-500">на конкурс</span>
            </h1>
            <hr className="divider-ru max-w-xs mx-auto" />
            <p style={{ color: 'var(--text-secondary)' }}>
              Заполните форму и прикрепите вашу работу. Все поля обязательны.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="space-y-8">

                {/* ── Nomination ── */}
                <div className="rounded-2xl border p-6 md:p-8 space-y-4"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                  <h2 className="font-heading text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                    1. Выберите номинацию
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {nominations.map((nom) => (
                      <label key={nom.value}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition duration-200 select-none
                          ${nomination === nom.value
                            ? 'border-crimson-600 bg-crimson-600/10'
                            : 'hover:border-crimson-600/50'}`}
                        style={{ borderColor: nomination === nom.value ? undefined : 'var(--border-color)' }}>
                        <input
                          type="radio"
                          name="nomination"
                          value={nom.value}
                          required
                          className="sr-only"
                          onChange={() => { setNomination(nom.value); setFile(null); }}
                        />
                        <span className={nomination === nom.value ? 'text-crimson-500' : ''} style={{ color: nomination !== nom.value ? 'var(--text-muted)' : undefined }}>
                          {nom.icon}
                        </span>
                        <span className="text-sm font-semibold text-center" style={{ color: 'var(--text-primary)' }}>
                          {nom.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* ── Personal info ── */}
                <div className="rounded-2xl border p-6 md:p-8 space-y-5"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                  <h2 className="font-heading text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                    2. Данные участника
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                        ФИО участника <span className="text-crimson-600">*</span>
                      </label>
                      <input
                        name="fullName"
                        type="text"
                        required
                        placeholder="Иванов Иван Иванович"
                        className="w-full rounded-lg px-4 py-3 text-sm outline-none transition"
                        style={{
                          backgroundColor: 'var(--bg-primary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                        }}
                        onFocus={e => (e.target.style.borderColor = '#b71c1c')}
                        onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                        Возраст <span className="text-crimson-600">*</span>
                      </label>
                      <input
                        name="age"
                        type="number"
                        min="10"
                        max="18"
                        required
                        placeholder="14"
                        className="w-full rounded-lg px-4 py-3 text-sm outline-none transition"
                        style={{
                          backgroundColor: 'var(--bg-primary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                        }}
                        onFocus={e => (e.target.style.borderColor = '#b71c1c')}
                        onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                        Регион <span className="text-crimson-600">*</span>
                      </label>
                      <input
                        name="region"
                        type="text"
                        required
                        placeholder="Москва"
                        className="w-full rounded-lg px-4 py-3 text-sm outline-none transition"
                        style={{
                          backgroundColor: 'var(--bg-primary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                        }}
                        onFocus={e => (e.target.style.borderColor = '#b71c1c')}
                        onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                        Email <span className="text-crimson-600">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="example@mail.ru"
                        className="w-full rounded-lg px-4 py-3 text-sm outline-none transition"
                        style={{
                          backgroundColor: 'var(--bg-primary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                        }}
                        onFocus={e => (e.target.style.borderColor = '#b71c1c')}
                        onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                        Телефон
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="+7 (999) 000-00-00"
                        className="w-full rounded-lg px-4 py-3 text-sm outline-none transition"
                        style={{
                          backgroundColor: 'var(--bg-primary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                        }}
                        onFocus={e => (e.target.style.borderColor = '#b71c1c')}
                        onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
                      />
                    </div>
                  </div>
                </div>

                {/* ── Work info ── */}
                <div className="rounded-2xl border p-6 md:p-8 space-y-5"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                  <h2 className="font-heading text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                    3. О вашей работе
                  </h2>

                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      Название работы <span className="text-crimson-600">*</span>
                    </label>
                    <input
                      name="workTitle"
                      type="text"
                      required
                      placeholder="«Моя Россия»"
                      className="w-full rounded-lg px-4 py-3 text-sm outline-none transition"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#b71c1c')}
                      onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      Краткое описание работы <span className="text-crimson-600">*</span>
                    </label>
                    <textarea
                      name="workDescription"
                      required
                      rows={4}
                      placeholder="О чём ваша работа, что вдохновило вас на её создание..."
                      className="w-full rounded-lg px-4 py-3 text-sm outline-none transition resize-none"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#b71c1c')}
                      onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
                    />
                  </div>
                </div>

                {/* ── File upload ── */}
                <div className="rounded-2xl border p-6 md:p-8 space-y-4"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                  <h2 className="font-heading text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                    4. Прикрепите работу
                  </h2>

                  {!nomination && (
                    <p className="text-sm py-3 text-center" style={{ color: 'var(--text-muted)' }}>
                      Сначала выберите номинацию — откроется нужный тип файлов
                    </p>
                  )}

                  {nomination && !file && (
                    <div
                      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition duration-200 ${dragging ? 'scale-[1.01]' : ''}`}
                      style={{ borderColor: dragging ? '#b71c1c' : 'var(--border-color)', backgroundColor: dragging ? 'rgba(183,28,28,0.05)' : undefined }}
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={e => { e.preventDefault(); setDragging(true); }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={handleDrop}
                    >
                      <Upload size={40} className="mx-auto mb-4 text-crimson-600 opacity-60" />
                      <p className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        Перетащите файл сюда или нажмите для выбора
                      </p>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        {currentNom?.hint}
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        name="file"
                        accept={currentNom?.accept}
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  )}

                  {file && (
                    <div className="flex items-center gap-4 p-4 rounded-xl border"
                      style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                      <FileIcon type={file.type} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                          {file.name}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {formatBytes(file.size)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                        className="p-1.5 rounded-lg hover:bg-crimson-600/10 transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Error */}
                {status === 'error' && (
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-crimson-600/30 bg-crimson-600/10">
                    <AlertCircle size={20} className="text-crimson-600 flex-shrink-0" />
                    <p className="text-sm text-crimson-500">{errorMsg}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 px-8 rounded-xl font-bold text-lg text-white transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  style={{ background: 'linear-gradient(135deg, #b71c1c 0%, #9b1515 100%)', boxShadow: '0 8px 24px rgba(183,28,28,0.30)' }}
                >
                  {status === 'loading' ? (
                    <><Loader2 size={22} className="animate-spin" /> Отправляем заявку…</>
                  ) : (
                    <>Отправить заявку на конкурс</>
                  )}
                </button>

                <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
                  Нажимая «Отправить», вы соглашаетесь с условиями конкурса и даёте
                  согласие на публикацию работы на сайте проекта.
                </p>

              </div>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
