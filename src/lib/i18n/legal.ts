import type { Locale } from "./types";

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalDoc {
  title: string;
  intro: string;
  sections: LegalSection[];
}

export type LegalDocKey = "privacy" | "terms" | "payment";

export interface LegalBundle {
  eyebrow: string;
  backHome: string;
  updatedLabel: string;
  updatedDate: string;
  docs: Record<LegalDocKey, LegalDoc>;
}

export const legal: Record<Locale, LegalBundle> = {
  ru: {
    eyebrow: "Документы",
    backHome: "На главную",
    updatedLabel: "Последнее обновление",
    updatedDate: "30 июня 2026 г.",
    docs: {
      privacy: {
        title: "Политика конфиденциальности",
        intro:
          "Настоящая Политика конфиденциальности описывает, как Sculptor of Your Body («мы») собирает, использует и защищает персональные данные пользователей сайта и клиентов онлайн-услуг и цифровых продуктов.",
        sections: [
          {
            heading: "Какие данные мы собираем",
            body: [
              "Мы собираем только те данные, которые вы предоставляете добровольно: имя, контактные данные (Telegram, email или телефон), а также информацию о ваших целях, образе жизни и состоянии здоровья, необходимую для оказания услуг.",
              "При оплате мы не получаем и не храним данные вашей банковской карты — платёж обрабатывается напрямую через банк или платёжную систему.",
            ],
          },
          {
            heading: "Как мы используем данные",
            body: [
              "Данные используются для связи с вами, составления индивидуальных программ тренировок и питания, сопровождения и улучшения качества услуг.",
              "Мы не используем ваши данные для спама и не передаём их третьим лицам в маркетинговых целях.",
            ],
          },
          {
            heading: "Передача третьим лицам",
            body: [
              "Ваши данные могут обрабатываться доверенными сервисами (мессенджеры, платёжные системы) исключительно в объёме, необходимом для оказания услуг. Мы не продаём и не передаём персональные данные третьим лицам.",
            ],
          },
          {
            heading: "Хранение и защита",
            body: [
              "Мы храним персональные данные только в течение срока, необходимого для оказания услуг, и принимаем разумные технические и организационные меры для их защиты от несанкционированного доступа.",
            ],
          },
          {
            heading: "Ваши права",
            body: [
              "Вы вправе запросить доступ к своим данным, их исправление или удаление. Для этого свяжитесь с нами по контактам, указанным ниже.",
            ],
          },
          {
            heading: "Контакты",
            body: ["По вопросам конфиденциальности пишите в Telegram: @MK_sculptor1."],
          },
        ],
      },
      terms: {
        title: "Условия использования",
        intro:
          "Используя сайт Sculptor of Your Body и приобретая наши услуги и цифровые продукты, вы соглашаетесь с настоящими Условиями использования.",
        sections: [
          {
            heading: "Услуги и продукты",
            body: [
              "Мы предоставляем онлайн-ведение, персональные планы питания и цифровые программы тренировок. Часть продуктов является цифровой и предоставляется в электронном виде после оплаты.",
            ],
          },
          {
            heading: "Интеллектуальная собственность",
            body: [
              "Все материалы, программы тренировок, планы питания и контент сайта являются интеллектуальной собственностью Sculptor of Your Body. Запрещается копирование, перепродажа или передача материалов третьим лицам без письменного согласия.",
            ],
          },
          {
            heading: "Обязанности пользователя",
            body: [
              "Вы обязуетесь предоставлять достоверную информацию и использовать материалы только в личных целях. Доступ к приобретённым продуктам предоставляется одному пользователю.",
            ],
          },
          {
            heading: "Здоровье и ответственность",
            body: [
              "Материалы носят информационный характер и не являются медицинской консультацией. Перед началом тренировок или изменением рациона рекомендуется проконсультироваться с врачом.",
              "Мы не несём ответственности за травмы или последствия, возникшие в результате неправильного выполнения упражнений.",
            ],
          },
          {
            heading: "Изменения условий",
            body: [
              "Мы оставляем за собой право изменять настоящие Условия. Актуальная версия всегда доступна на этой странице.",
            ],
          },
          {
            heading: "Контакты",
            body: ["По вопросам использования услуг пишите в Telegram: @MK_sculptor1."],
          },
        ],
      },
      payment: {
        title: "Условия оплаты",
        intro:
          "Настоящие Условия оплаты регулируют порядок оплаты услуг и цифровых продуктов Sculptor of Your Body.",
        sections: [
          {
            heading: "Цены и валюта",
            body: [
              "Стоимость услуг указана на сайте в долларах США (USD); для удобства может отображаться ориентировочная сумма в гривне (UAH) по текущему курсу. Итоговая сумма к оплате определяется на момент оплаты.",
            ],
          },
          {
            heading: "Способы оплаты",
            body: [
              "Оплата принимается на украинскую банковскую карту или через PayPal. Реквизиты для оплаты предоставляются в Telegram-боте после выбора услуги.",
            ],
          },
          {
            heading: "Подтверждение и доступ",
            body: [
              "После оплаты пришлите скриншот квитанции в Telegram. После проверки платежа мы предоставим доступ к программе или начнём работу по выбранной услуге.",
            ],
          },
          {
            heading: "Возврат средств",
            body: [
              "Цифровые продукты (программы тренировок, планы питания) предоставляются в электронном виде; после открытия доступа возврат средств не производится.",
              "По услугам онлайн-ведения вопрос возврата за неиспользованный период рассматривается индивидуально.",
            ],
          },
          {
            heading: "Контакты",
            body: ["По вопросам оплаты пишите в Telegram: @MK_sculptor1."],
          },
        ],
      },
    },
  },
  uk: {
    eyebrow: "Документи",
    backHome: "На головну",
    updatedLabel: "Останнє оновлення",
    updatedDate: "30 червня 2026 р.",
    docs: {
      privacy: {
        title: "Політика конфіденційності",
        intro:
          "Ця Політика конфіденційності описує, як Sculptor of Your Body («ми») збирає, використовує та захищає персональні дані користувачів сайту та клієнтів онлайн-послуг і цифрових продуктів.",
        sections: [
          {
            heading: "Які дані ми збираємо",
            body: [
              "Ми збираємо лише ті дані, які ви надаєте добровільно: ім'я, контактні дані (Telegram, email або телефон), а також інформацію про ваші цілі, спосіб життя та стан здоров'я, необхідну для надання послуг.",
              "Під час оплати ми не отримуємо та не зберігаємо дані вашої банківської картки — платіж обробляється безпосередньо через банк або платіжну систему.",
            ],
          },
          {
            heading: "Як ми використовуємо дані",
            body: [
              "Дані використовуються для зв'язку з вами, складання індивідуальних програм тренувань і харчування, супроводу та покращення якості послуг.",
              "Ми не використовуємо ваші дані для спаму і не передаємо їх третім особам у маркетингових цілях.",
            ],
          },
          {
            heading: "Передача третім особам",
            body: [
              "Ваші дані можуть оброблятися довіреними сервісами (месенджери, платіжні системи) виключно в обсязі, необхідному для надання послуг. Ми не продаємо і не передаємо персональні дані третім особам.",
            ],
          },
          {
            heading: "Зберігання та захист",
            body: [
              "Ми зберігаємо персональні дані лише протягом строку, необхідного для надання послуг, і вживаємо розумних технічних та організаційних заходів для їх захисту від несанкціонованого доступу.",
            ],
          },
          {
            heading: "Ваші права",
            body: [
              "Ви маєте право запитати доступ до своїх даних, їх виправлення або видалення. Для цього зв'яжіться з нами за контактами, вказаними нижче.",
            ],
          },
          {
            heading: "Контакти",
            body: ["З питань конфіденційності пишіть у Telegram: @MK_sculptor1."],
          },
        ],
      },
      terms: {
        title: "Умови використання",
        intro:
          "Використовуючи сайт Sculptor of Your Body та купуючи наші послуги й цифрові продукти, ви погоджуєтеся з цими Умовами використання.",
        sections: [
          {
            heading: "Послуги та продукти",
            body: [
              "Ми надаємо онлайн-ведення, персональні плани харчування та цифрові програми тренувань. Частина продуктів є цифровою та надається в електронному вигляді після оплати.",
            ],
          },
          {
            heading: "Інтелектуальна власність",
            body: [
              "Усі матеріали, програми тренувань, плани харчування та контент сайту є інтелектуальною власністю Sculptor of Your Body. Заборонено копіювання, перепродаж або передачу матеріалів третім особам без письмової згоди.",
            ],
          },
          {
            heading: "Обов'язки користувача",
            body: [
              "Ви зобов'язуєтеся надавати достовірну інформацію та використовувати матеріали лише в особистих цілях. Доступ до придбаних продуктів надається одному користувачу.",
            ],
          },
          {
            heading: "Здоров'я та відповідальність",
            body: [
              "Матеріали мають інформаційний характер і не є медичною консультацією. Перед початком тренувань або зміною раціону рекомендується проконсультуватися з лікарем.",
              "Ми не несемо відповідальності за травми чи наслідки, що виникли внаслідок неправильного виконання вправ.",
            ],
          },
          {
            heading: "Зміни умов",
            body: [
              "Ми залишаємо за собою право змінювати ці Умови. Актуальна версія завжди доступна на цій сторінці.",
            ],
          },
          {
            heading: "Контакти",
            body: ["З питань використання послуг пишіть у Telegram: @MK_sculptor1."],
          },
        ],
      },
      payment: {
        title: "Умови оплати",
        intro:
          "Ці Умови оплати регулюють порядок оплати послуг і цифрових продуктів Sculptor of Your Body.",
        sections: [
          {
            heading: "Ціни та валюта",
            body: [
              "Вартість послуг указана на сайті в доларах США (USD); для зручності може відображатися орієнтовна сума у гривні (UAH) за поточним курсом. Підсумкова сума до сплати визначається на момент оплати.",
            ],
          },
          {
            heading: "Способи оплати",
            body: [
              "Оплата приймається на українську банківську картку або через PayPal. Реквізити для оплати надаються в Telegram-боті після вибору послуги.",
            ],
          },
          {
            heading: "Підтвердження та доступ",
            body: [
              "Після оплати надішліть скріншот квитанції в Telegram. Після перевірки платежу ми надамо доступ до програми або розпочнемо роботу за обраною послугою.",
            ],
          },
          {
            heading: "Повернення коштів",
            body: [
              "Цифрові продукти (програми тренувань, плани харчування) надаються в електронному вигляді; після відкриття доступу повернення коштів не здійснюється.",
              "Щодо послуг онлайн-ведення питання повернення за невикористаний період розглядається індивідуально.",
            ],
          },
          {
            heading: "Контакти",
            body: ["З питань оплати пишіть у Telegram: @MK_sculptor1."],
          },
        ],
      },
    },
  },
  en: {
    eyebrow: "Legal",
    backHome: "Back to home",
    updatedLabel: "Last updated",
    updatedDate: "June 30, 2026",
    docs: {
      privacy: {
        title: "Privacy Policy",
        intro:
          'This Privacy Policy explains how Sculptor of Your Body ("we") collects, uses and protects the personal data of website visitors and clients of our online services and digital products.',
        sections: [
          {
            heading: "What data we collect",
            body: [
              "We collect only the data you provide voluntarily: your name, contact details (Telegram, email or phone), and information about your goals, lifestyle and health that is necessary to deliver our services.",
              "When you pay, we do not receive or store your bank card details — the payment is processed directly by the bank or payment provider.",
            ],
          },
          {
            heading: "How we use your data",
            body: [
              "Your data is used to contact you, build personalized training and nutrition programs, provide coaching and improve the quality of our services.",
              "We do not use your data for spam and do not share it with third parties for marketing purposes.",
            ],
          },
          {
            heading: "Sharing with third parties",
            body: [
              "Your data may be processed by trusted services (messengers, payment providers) only to the extent required to deliver our services. We do not sell or share personal data with third parties.",
            ],
          },
          {
            heading: "Storage and security",
            body: [
              "We store personal data only for as long as necessary to deliver our services and apply reasonable technical and organizational measures to protect it from unauthorized access.",
            ],
          },
          {
            heading: "Your rights",
            body: [
              "You have the right to request access to, correction of, or deletion of your data. To do so, contact us using the details below.",
            ],
          },
          {
            heading: "Contact",
            body: ["For privacy questions, message us on Telegram: @MK_sculptor1."],
          },
        ],
      },
      terms: {
        title: "Terms of Use",
        intro:
          "By using the Sculptor of Your Body website and purchasing our services and digital products, you agree to these Terms of Use.",
        sections: [
          {
            heading: "Services and products",
            body: [
              "We provide online coaching, personalized nutrition plans and digital training programs. Some products are digital and are delivered electronically after payment.",
            ],
          },
          {
            heading: "Intellectual property",
            body: [
              "All materials, training programs, nutrition plans and website content are the intellectual property of Sculptor of Your Body. Copying, reselling or sharing the materials with third parties without written consent is prohibited.",
            ],
          },
          {
            heading: "User responsibilities",
            body: [
              "You agree to provide accurate information and to use the materials for personal purposes only. Access to purchased products is granted to a single user.",
            ],
          },
          {
            heading: "Health and liability",
            body: [
              "The materials are for informational purposes and do not constitute medical advice. Consult a doctor before starting any training or changing your diet.",
              "We are not liable for injuries or consequences resulting from incorrect exercise performance.",
            ],
          },
          {
            heading: "Changes to the terms",
            body: [
              "We reserve the right to amend these Terms. The current version is always available on this page.",
            ],
          },
          {
            heading: "Contact",
            body: ["For questions about our services, message us on Telegram: @MK_sculptor1."],
          },
        ],
      },
      payment: {
        title: "Payment Terms",
        intro:
          "These Payment Terms govern how payments for Sculptor of Your Body services and digital products are made.",
        sections: [
          {
            heading: "Prices and currency",
            body: [
              "Service prices are listed on the website in US dollars (USD); an approximate amount in Ukrainian hryvnia (UAH) may be shown for convenience at the current rate. The final amount due is determined at the time of payment.",
            ],
          },
          {
            heading: "Payment methods",
            body: [
              "Payments are accepted to a Ukrainian bank card or via PayPal. Payment details are provided in the Telegram bot after you select a service.",
            ],
          },
          {
            heading: "Confirmation and access",
            body: [
              "After payment, send a screenshot of the receipt on Telegram. Once the payment is verified, we will grant access to the program or begin work on the selected service.",
            ],
          },
          {
            heading: "Refunds",
            body: [
              "Digital products (training programs, nutrition plans) are delivered electronically; once access is granted, refunds are not provided.",
              "For online coaching, refunds for an unused period are considered on a case-by-case basis.",
            ],
          },
          {
            heading: "Contact",
            body: ["For payment questions, message us on Telegram: @MK_sculptor1."],
          },
        ],
      },
    },
  },
};
