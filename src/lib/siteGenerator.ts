interface SiteConfig {
  title: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  sections: string[];
}

export const analyzeSiteDescription = (description: string): SiteConfig => {
  const lowerDesc = description.toLowerCase();
  
  const keywords = {
    ecommerce: ['магазин', 'товар', 'продукт', 'купить', 'корзина', 'каталог'],
    portfolio: ['портфолио', 'резюме', 'работы', 'проекты', 'cv'],
    landing: ['лендинг', 'landing', 'посадочная', 'продающий'],
    blog: ['блог', 'статьи', 'новости', 'публикации'],
    corporate: ['компания', 'о нас', 'услуги', 'команда'],
    restaurant: ['ресторан', 'кафе', 'меню', 'еда', 'кухня'],
    fitness: ['фитнес', 'спортзал', 'тренировки', 'спорт'],
    education: ['курсы', 'обучение', 'школа', 'образование'],
  };

  let siteType = 'landing';
  for (const [type, words] of Object.entries(keywords)) {
    if (words.some(word => lowerDesc.includes(word))) {
      siteType = type;
      break;
    }
  }

  const colorSchemes = {
    синий: { primary: '#2563eb', secondary: '#3b82f6', accent: '#60a5fa' },
    зеленый: { primary: '#16a34a', secondary: '#22c55e', accent: '#4ade80' },
    фиолетовый: { primary: '#7c3aed', secondary: '#8b5cf6', accent: '#a78bfa' },
    красный: { primary: '#dc2626', secondary: '#ef4444', accent: '#f87171' },
    оранжевый: { primary: '#ea580c', secondary: '#f97316', accent: '#fb923c' },
    розовый: { primary: '#db2777', secondary: '#ec4899', accent: '#f472b6' },
  };

  let colors = { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#a78bfa' };
  for (const [colorName, scheme] of Object.entries(colorSchemes)) {
    if (lowerDesc.includes(colorName)) {
      colors = scheme;
      break;
    }
  }

  return {
    title: extractTitle(description),
    description,
    colors,
    sections: getSectionsForType(siteType),
  };
};

const extractTitle = (description: string): string => {
  const match = description.match(/(?:сайт|создай|сделай)\s+(?:для|про|о)?\s*([а-яёa-z\s]+)/i);
  if (match) {
    return match[1].trim().split(' ').slice(0, 3).join(' ');
  }
  return 'Новый сайт';
};

const getSectionsForType = (type: string): string[] => {
  const sectionMap: Record<string, string[]> = {
    ecommerce: ['hero', 'products', 'features', 'footer'],
    portfolio: ['hero', 'about', 'projects', 'contact'],
    landing: ['hero', 'features', 'cta', 'footer'],
    blog: ['hero', 'articles', 'categories', 'footer'],
    corporate: ['hero', 'services', 'about', 'team', 'contact'],
    restaurant: ['hero', 'menu', 'about', 'contact'],
    fitness: ['hero', 'programs', 'trainers', 'pricing'],
    education: ['hero', 'courses', 'teachers', 'pricing'],
  };
  
  return sectionMap[type] || ['hero', 'features', 'footer'];
};

export const generateFullHTML = (config: SiteConfig): string => {
  const sections = config.sections.map(section => generateSection(section, config)).join('\n');
  
  return `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '${config.colors.primary}',
            secondary: '${config.colors.secondary}',
            accent: '${config.colors.accent}',
          }
        }
      }
    }
  </script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .smooth-scroll { scroll-behavior: smooth; }
  </style>
</head>
<body class="smooth-scroll">
  ${sections}
  
  <script>
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  </script>
</body>
</html>
  `.trim();
};

const generateSection = (type: string, config: SiteConfig): string => {
  const generators: Record<string, (config: SiteConfig) => string> = {
    hero: generateHero,
    products: generateProducts,
    features: generateFeatures,
    projects: generateProjects,
    about: generateAbout,
    contact: generateContact,
    cta: generateCTA,
    footer: generateFooter,
    articles: generateArticles,
    services: generateServices,
    team: generateTeam,
    menu: generateMenu,
    programs: generatePrograms,
    trainers: generateTrainers,
    pricing: generatePricing,
    courses: generateCourses,
    teachers: generateTeachers,
    categories: generateCategories,
  };

  return generators[type]?.(config) || '';
};

const generateHero = (config: SiteConfig): string => `
<header class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 px-6">
  <div class="text-center max-w-4xl">
    <h1 class="text-6xl md:text-7xl font-bold mb-6 text-gray-900">${config.title}</h1>
    <p class="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">${config.description}</p>
    <div class="flex gap-4 justify-center flex-wrap">
      <button style="background-color: ${config.colors.primary}" class="text-white px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition">
        Начать
      </button>
      <button class="border-2 border-gray-300 px-8 py-4 rounded-xl text-lg font-semibold hover:border-gray-400 transition">
        Узнать больше
      </button>
    </div>
  </div>
</header>
`;

const generateProducts = (config: SiteConfig): string => `
<section id="products" class="py-20 px-6 bg-white">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-16">Наши товары</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${[1, 2, 3, 4, 5, 6].map(i => `
        <div class="border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
          <div class="h-64 bg-gradient-to-br from-purple-${200 + i * 50} to-indigo-${300 + i * 50}"></div>
          <div class="p-6">
            <h3 class="text-2xl font-semibold mb-2">Товар ${i}</h3>
            <p class="text-gray-600 mb-4">Высококачественный продукт для ваших нужд</p>
            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold" style="color: ${config.colors.primary}">${1000 + i * 500}₽</span>
              <button style="background-color: ${config.colors.primary}" class="text-white px-6 py-2 rounded-lg hover:opacity-90">
                В корзину
              </button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`;

const generateFeatures = (config: SiteConfig): string => `
<section id="features" class="py-20 px-6 bg-gray-50">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-16">Преимущества</h2>
    <div class="grid md:grid-cols-3 gap-12">
      ${[
        { icon: '⚡', title: 'Быстро', desc: 'Мгновенный результат без ожидания' },
        { icon: '🎨', title: 'Красиво', desc: 'Современный дизайн из коробки' },
        { icon: '📱', title: 'Адаптивно', desc: 'Работает на всех устройствах' },
      ].map(feat => `
        <div class="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
          <div class="text-6xl mb-4">${feat.icon}</div>
          <h3 class="text-2xl font-bold mb-3">${feat.title}</h3>
          <p class="text-gray-600 text-lg">${feat.desc}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`;

const generateProjects = (config: SiteConfig): string => `
<section id="projects" class="py-20 px-6 bg-white">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-16">Мои проекты</h2>
    <div class="grid md:grid-cols-2 gap-8">
      ${[1, 2, 3, 4].map(i => `
        <div class="group border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div class="h-80 bg-gradient-to-br from-purple-${300 + i * 100} to-indigo-${400 + i * 100} relative overflow-hidden">
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>
          </div>
          <div class="p-6">
            <h3 class="text-2xl font-bold mb-2">Проект ${i}</h3>
            <p class="text-gray-600 mb-4">Описание проекта и использованные технологии</p>
            <button style="color: ${config.colors.primary}" class="font-semibold hover:underline">
              Подробнее →
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`;

const generateAbout = (config: SiteConfig): string => `
<section id="about" class="py-20 px-6 bg-gray-50">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="text-5xl font-bold mb-8">О нас</h2>
    <p class="text-xl text-gray-700 leading-relaxed mb-6">
      Мы команда профессионалов, которая создает выдающиеся решения для наших клиентов.
    </p>
    <p class="text-xl text-gray-700 leading-relaxed">
      Наш опыт и экспертиза помогают воплощать самые смелые идеи в жизнь.
    </p>
  </div>
</section>
`;

const generateContact = (config: SiteConfig): string => `
<section id="contact" class="py-20 px-6 bg-white">
  <div class="max-w-2xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-12">Свяжитесь с нами</h2>
    <form class="space-y-6">
      <input type="text" placeholder="Ваше имя" class="w-full px-6 py-4 border-2 rounded-xl text-lg focus:outline-none focus:border-purple-500 transition">
      <input type="email" placeholder="Email" class="w-full px-6 py-4 border-2 rounded-xl text-lg focus:outline-none focus:border-purple-500 transition">
      <textarea placeholder="Сообщение" rows="6" class="w-full px-6 py-4 border-2 rounded-xl text-lg focus:outline-none focus:border-purple-500 transition"></textarea>
      <button type="submit" style="background-color: ${config.colors.primary}" class="w-full text-white py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition">
        Отправить
      </button>
    </form>
  </div>
</section>
`;

const generateCTA = (config: SiteConfig): string => `
<section class="py-20 px-6" style="background-color: ${config.colors.primary}">
  <div class="max-w-4xl mx-auto text-center text-white">
    <h2 class="text-5xl font-bold mb-6">Готовы начать?</h2>
    <p class="text-xl mb-8 opacity-90">Присоединяйтесь к тысячам довольных пользователей</p>
    <button class="bg-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition" style="color: ${config.colors.primary}">
      Попробовать бесплатно
    </button>
  </div>
</section>
`;

const generateFooter = (config: SiteConfig): string => `
<footer class="py-12 px-6 bg-gray-900 text-white">
  <div class="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
    <div>
      <h3 class="text-2xl font-bold mb-4">${config.title}</h3>
      <p class="text-gray-400">Создано с помощью AI</p>
    </div>
    <div>
      <h4 class="font-semibold mb-4">Навигация</h4>
      <ul class="space-y-2 text-gray-400">
        <li><a href="#" class="hover:text-white">Главная</a></li>
        <li><a href="#" class="hover:text-white">О нас</a></li>
        <li><a href="#" class="hover:text-white">Контакты</a></li>
      </ul>
    </div>
    <div>
      <h4 class="font-semibold mb-4">Поддержка</h4>
      <ul class="space-y-2 text-gray-400">
        <li><a href="#" class="hover:text-white">FAQ</a></li>
        <li><a href="#" class="hover:text-white">Помощь</a></li>
      </ul>
    </div>
    <div>
      <h4 class="font-semibold mb-4">Контакты</h4>
      <p class="text-gray-400">info@example.com</p>
      <p class="text-gray-400">+7 (999) 123-45-67</p>
    </div>
  </div>
  <div class="text-center mt-12 pt-8 border-t border-gray-800 text-gray-400">
    <p>© 2024 ${config.title}. Все права защищены.</p>
  </div>
</footer>
`;

const generateArticles = (config: SiteConfig): string => `
<section id="blog" class="py-20 px-6 bg-white">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-16">Последние статьи</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${[1, 2, 3, 4, 5, 6].map(i => `
        <article class="border rounded-2xl overflow-hidden hover:shadow-xl transition">
          <div class="h-48 bg-gradient-to-br from-blue-${200 + i * 50} to-purple-${300 + i * 50}"></div>
          <div class="p-6">
            <div class="text-sm text-gray-500 mb-2">${new Date().toLocaleDateString('ru-RU')}</div>
            <h3 class="text-xl font-bold mb-3">Заголовок статьи ${i}</h3>
            <p class="text-gray-600 mb-4">Краткое описание содержания статьи и основные тезисы...</p>
            <a href="#" style="color: ${config.colors.primary}" class="font-semibold hover:underline">Читать далее →</a>
          </div>
        </article>
      `).join('')}
    </div>
  </div>
</section>
`;

const generateServices = (config: SiteConfig): string => `
<section id="services" class="py-20 px-6 bg-gray-50">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-16">Наши услуги</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${['Консультация', 'Разработка', 'Поддержка', 'Дизайн', 'Маркетинг', 'Аналитика'].map((service, i) => `
        <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <div class="w-16 h-16 rounded-full mb-4 flex items-center justify-center text-2xl" style="background-color: ${config.colors.primary}20">
            ${['💼', '⚙️', '🛠️', '🎨', '📈', '📊'][i]}
          </div>
          <h3 class="text-2xl font-bold mb-3">${service}</h3>
          <p class="text-gray-600">Профессиональные услуги высокого качества</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`;

const generateTeam = (config: SiteConfig): string => `
<section id="team" class="py-20 px-6 bg-white">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-16">Наша команда</h2>
    <div class="grid md:grid-cols-4 gap-8">
      ${[1, 2, 3, 4].map(i => `
        <div class="text-center">
          <div class="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-purple-${300 + i * 100} to-indigo-${400 + i * 100} mb-4"></div>
          <h3 class="text-xl font-bold mb-1">Имя Фамилия</h3>
          <p class="text-gray-600">Должность</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`;

const generateMenu = (config: SiteConfig): string => `
<section id="menu" class="py-20 px-6 bg-gray-50">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-16">Меню</h2>
    <div class="grid md:grid-cols-2 gap-6">
      ${[1, 2, 3, 4, 5, 6].map(i => `
        <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex justify-between items-center">
          <div>
            <h3 class="text-xl font-bold mb-2">Блюдо ${i}</h3>
            <p class="text-gray-600">Описание блюда и ингредиенты</p>
          </div>
          <div class="text-2xl font-bold" style="color: ${config.colors.primary}">${500 + i * 200}₽</div>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`;

const generatePrograms = (config: SiteConfig): string => `
<section id="programs" class="py-20 px-6 bg-white">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-16">Тренировочные программы</h2>
    <div class="grid md:grid-cols-3 gap-8">
      ${['Начинающий', 'Средний', 'Продвинутый'].map((level, i) => `
        <div class="border-2 rounded-2xl p-8 hover:border-purple-500 transition">
          <h3 class="text-2xl font-bold mb-4">${level}</h3>
          <ul class="space-y-3 mb-6 text-gray-700">
            <li>✓ Персональная программа</li>
            <li>✓ ${2 + i} тренировки в неделю</li>
            <li>✓ Консультации тренера</li>
          </ul>
          <button style="background-color: ${config.colors.primary}" class="w-full text-white py-3 rounded-xl font-semibold">
            Выбрать
          </button>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`;

const generateTrainers = (config: SiteConfig): string => generateTeam(config).replace('Наша команда', 'Наши тренеры');

const generatePricing = (config: SiteConfig): string => `
<section id="pricing" class="py-20 px-6 bg-gray-50">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-16">Тарифы</h2>
    <div class="grid md:grid-cols-3 gap-8">
      ${['Базовый', 'Стандарт', 'Премиум'].map((plan, i) => `
        <div class="bg-white rounded-2xl p-8 shadow-xl ${i === 1 ? 'ring-4 ring-purple-500 scale-105' : ''}">
          <h3 class="text-2xl font-bold mb-2">${plan}</h3>
          <div class="text-4xl font-bold mb-6" style="color: ${config.colors.primary}">${(i + 1) * 1000}₽<span class="text-lg text-gray-600">/мес</span></div>
          <ul class="space-y-3 mb-8 text-gray-700">
            <li>✓ ${(i + 1) * 5} проектов</li>
            <li>✓ ${(i + 1) * 10} ГБ хранилища</li>
            <li>✓ Поддержка 24/7</li>
          </ul>
          <button style="background-color: ${config.colors.primary}" class="w-full text-white py-3 rounded-xl font-semibold hover:opacity-90">
            Выбрать план
          </button>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`;

const generateCourses = (config: SiteConfig): string => `
<section id="courses" class="py-20 px-6 bg-white">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-16">Наши курсы</h2>
    <div class="grid md:grid-cols-3 gap-8">
      ${[1, 2, 3, 4, 5, 6].map(i => `
        <div class="border rounded-2xl overflow-hidden hover:shadow-xl transition">
          <div class="h-48 bg-gradient-to-br from-green-${200 + i * 50} to-blue-${300 + i * 50}"></div>
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2">Курс ${i}</h3>
            <p class="text-gray-600 mb-4">${4 + i * 2} недель обучения</p>
            <button style="background-color: ${config.colors.primary}" class="w-full text-white py-2 rounded-lg">
              Записаться
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`;

const generateTeachers = (config: SiteConfig): string => generateTeam(config).replace('Наша команда', 'Наши преподаватели');

const generateCategories = (config: SiteConfig): string => `
<section id="categories" class="py-20 px-6 bg-gray-50">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-16">Категории</h2>
    <div class="grid md:grid-cols-4 gap-6">
      ${['Технологии', 'Бизнес', 'Дизайн', 'Маркетинг', 'Разработка', 'Lifestyle', 'Образование', 'Наука'].map((cat, i) => `
        <a href="#" class="p-6 bg-white rounded-xl text-center hover:shadow-xl transition" style="border-top: 4px solid ${config.colors.primary}">
          <div class="text-3xl mb-2">${['💻', '💼', '🎨', '📱', '⚙️', '✨', '📚', '🔬'][i]}</div>
          <h3 class="font-bold">${cat}</h3>
        </a>
      `).join('')}
    </div>
  </div>
</section>
`;
