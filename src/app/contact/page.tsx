'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Обработка формы
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="hero-section hero-bg pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="label-dark animate-fade-up">
              Контакты
            </div>

            <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight animate-fade-up-delay" style={{ color: 'var(--text-primary)' }}>
              Свяжитесь
              <br />
              <span className="text-crimson-500">с нами</span>
            </h1>

            <hr className="divider-ru max-w-xs mx-auto" />

            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Мы всегда открыты для общения. Если у вас есть вопросы или предложения,
              не стесняйтесь обращаться к нам.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-xl border shadow-sm text-center" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'rgba(15,27,46,0.10)' }}>
              <div className="mb-6 flex justify-center">
                <MapPin size={40} className="text-crimson-600" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Адрес
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                123007, г. Москва,<br />
                Хорошевское шоссе,<br />
                д. 35, корпус 1
              </p>
            </div>

            <div className="p-8 rounded-xl border shadow-sm text-center" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'rgba(15,27,46,0.10)' }}>
              <div className="mb-6 flex justify-center">
                <Phone size={40} className="text-crimson-600" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Телефон
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                +7 (495) 144-42-02<br />
                +7 (903) 563-01-81
              </p>
            </div>

            <div className="p-8 rounded-xl border shadow-sm text-center" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'rgba(15,27,46,0.10)' }}>
              <div className="mb-6 flex justify-center">
                <Mail size={40} className="text-crimson-600" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Email
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                deti.geroi@mail.ru
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Напишите нам
              </h2>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                Заполните форму ниже, и мы свяжемся с вами в ближайшее время
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Иван Иванов"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="example@mail.ru"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Телефон
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Тема обращения
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Выберите тему</option>
                    <option value="general">Общий вопрос</option>
                    <option value="partnership">Сотрудничество</option>
                    <option value="media">СМИ</option>
                    <option value="support">Поддержка проекта</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Сообщение *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="input-field resize-none"
                  placeholder="Ваше сообщение..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium text-white bg-crimson-600 hover:bg-crimson-700 transition-colors shadow-md shadow-crimson-600/20"
                >
                  <Send size={20} className="mr-2" />
                  Отправить сообщение
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Как нас найти
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Мы находимся в центре Москвы
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="aspect-video rounded-xl border flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'rgba(15,27,46,0.10)' }}>
              <MapPin size={64} className="text-crimson-600 opacity-50" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
