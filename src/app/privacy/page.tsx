import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | Sculptor of Your Body™",
};

export default function PrivacyPage() {
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

        <h1 className="text-3xl font-800 text-white mb-8">Политика конфиденциальности</h1>

        <div className="space-y-6 text-[var(--text-secondary)] text-sm leading-relaxed">
          <p>
            Настоящая политика конфиденциальности определяет порядок сбора, использования и защиты
            персональных данных пользователей сайта Sculptor of Your Body™.
          </p>
          <h2 className="text-white font-700 text-base">Сбор данных</h2>
          <p>
            Мы собираем только данные, которые вы добровольно предоставляете через контактную форму:
            имя, контактный аккаунт и описание цели. Данные используются исключительно для связи
            с вами по вопросам оказания услуг.
          </p>
          <h2 className="text-white font-700 text-base">Использование данных</h2>
          <p>
            Ваши данные не передаются третьим лицам, не используются в рекламных целях и хранятся
            только на период оказания услуг.
          </p>
          <h2 className="text-white font-700 text-base">Контакт</h2>
          <p>
            По вопросам конфиденциальности: @sculptorofyourbody в Telegram.
          </p>
        </div>
      </div>
    </main>
  );
}
