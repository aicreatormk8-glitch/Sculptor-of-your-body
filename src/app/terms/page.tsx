import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Условия оплаты | Sculptor of Your Body™",
};

export default function TermsPage() {
  return (
    <main className="min-h-dvh bg-[var(--bg-primary)] py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--blue-neon)] transition-colors mb-8"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 12l-4-4 4-4" />
          </svg>
          Назад
        </Link>

        <h1 className="text-3xl font-800 text-white mb-8">Условия оплаты</h1>

        <div className="space-y-6 text-[var(--text-secondary)] text-sm leading-relaxed">
          <h2 className="text-white font-700 text-base">Доступные услуги</h2>
          <ul className="space-y-2 list-none">
            <li>• Онлайн-ведение — $120 / месяц</li>
            <li>• Персональный план питания — $70</li>
            <li>• Программа «Твоя лучшая версия» — $33</li>
          </ul>

          <h2 className="text-white font-700 text-base">Порядок оплаты</h2>
          <p>
            После подачи заявки тренер свяжется с вами для уточнения деталей и предоставит
            реквизиты для оплаты. Оплата принимается банковским переводом или через
            платёжные системы (детали уточняются при связи).
          </p>

          <h2 className="text-white font-700 text-base">Доступ к программе</h2>
          <p>
            После подтверждения оплаты программы «Твоя лучшая версия» вы получаете
            ссылку на закрытый Telegram-канал с материалами программы. Доступ — пожизненный.
          </p>

          <h2 className="text-white font-700 text-base">Возврат средств</h2>
          <p>
            Возврат средств возможен в течение 48 часов с момента оплаты при условии,
            что услуга не была начата. По вопросам возврата обращайтесь в Telegram.
          </p>
        </div>
      </div>
    </main>
  );
}
