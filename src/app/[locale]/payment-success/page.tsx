'use client';

import { useEffect } from 'react';

export default function PaymentSuccessPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'https://t.me/+KhFZoWiTgjphYmQy';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#020712] text-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center border border-cyan-500/30 rounded-3xl p-10 bg-[#06111f]">
        <div className="text-6xl mb-6">✅</div>

        <h1 className="text-4xl font-bold mb-4">
          Оплата прошла успешно!
        </h1>

        <p className="text-gray-300 mb-8">
          Спасибо за покупку.
          <br />
          Через несколько секунд вы будете автоматически перенаправлены
          в закрытый Telegram-канал с программой.
        </p>

        <a
          href="https://t.me/+KhFZoWiTgjphYmQy"
          className="inline-block px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition"
        >
          Перейти сейчас
        </a>
      </div>
    </main>
  );
}