'use client';

import { useState } from 'react';

export default function DonateForm() {
  const [amount, setAmount] = useState(5000);
  const [period, setPeriod] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const amounts = [3000, 5000, 10000, 15000, 25000, 50000];

  return (
    <section className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="font-heading text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Оформите пожертвование
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Выберите сумму
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {amounts.map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setAmount(val)}
                        className={`py-3 px-4 rounded-lg font-medium transition ${
                          amount === val
                            ? 'bg-crimson-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {val.toLocaleString()} ₽
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      ₽
                    </span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="input-field pl-8"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Срок поддержки (месяцев)
                  </label>
                  <div className="flex gap-3">
                    {[1, 3, 6, 12].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setPeriod(val)}
                        className={`flex-grow py-3 rounded-lg font-medium transition ${
                          period === val
                            ? 'bg-crimson-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {val} мес.
                      </button>
                    ))}
                  </div>
                  <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                    Итого: {amount * period} ₽
                  </p>
                </div>

                <div className="pt-6 border-t" style={{ borderColor: 'rgba(15,27,46,0.12)' }}>
                  <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>Контактные данные</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                        Имя
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-field"
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                        placeholder="Ваш email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                        Телефон
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input-field"
                        placeholder="Ваш телефон"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    className="w-full bg-crimson-600 text-white font-bold py-4 rounded-lg hover:bg-crimson-700 transition-colors shadow-lg shadow-crimson-600/20 hover:shadow-xl transform hover:-translate-y-1 transition-transform"
                  >
                    Перейти к оплате
                  </button>
                </div>
              </div>
            </div>

            <div className="theme-panel-ru p-8 md:p-12 flex flex-col justify-center">
              <h3 className="font-heading text-2xl font-bold mb-6">Почему мы?</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-crimson-600 rounded-full p-2 mr-4 mt-1">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-4 h-4 text-white"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Прозрачность</h4>
                    <p className="text-sm text-gray-300">
                      Все средства идут на конкретные проекты, отчеты публикуются регулярно
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-crimson-600 rounded-full p-2 mr-4 mt-1">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-4 h-4 text-white"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Помощь детям</h4>
                    <p className="text-sm text-gray-300">
                      Средства обеспечивают участие детей в мероприятиях, образовательные программы и психологическую поддержку
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-crimson-600 rounded-full p-2 mr-4 mt-1">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-4 h-4 text-white"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Индивидуальный подход</h4>
                    <p className="text-sm text-gray-300">
                      Мы работаем с каждой семьей индивидуально, учитывая их потребности
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/20 mt-6">
                  <div className="theme-inner-card p-6 rounded-xl">
                    <h4 className="font-medium mb-3">Ваш взнос</h4>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Сумма:</span>
                      <span className="font-bold">{amount.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-300">Срок:</span>
                      <span className="font-bold">{period} мес.</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-white/20 text-lg font-bold">
                      <span>Всего:</span>
                      <span>{(amount * period).toLocaleString()} ₽</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
