interface SiteConfig {
  title: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  sections: string[];
  style: 'modern' | 'minimal' | 'bold' | 'playful' | 'elegant' | 'dark';
  interactive: boolean;
}

export const analyzeSiteDescription = (description: string): SiteConfig => {
  const lowerDesc = description.toLowerCase();
  
  const keywords = {
    game: ['игра', 'game', 'викторина', 'квиз', 'играть', 'геймдев', 'аркада', 'головоломка', 'пазл'],
    app: ['приложение', 'app', 'сервис', 'платформа', 'инструмент', 'калькулятор', 'конвертер'],
    ecommerce: ['магазин', 'товар', 'продукт', 'купить', 'корзина', 'каталог', 'shop', 'store'],
    portfolio: ['портфолио', 'резюме', 'работы', 'проекты', 'cv', 'portfolio'],
    landing: ['лендинг', 'landing', 'посадочная', 'продающий'],
    blog: ['блог', 'статьи', 'новости', 'публикации', 'журнал'],
    corporate: ['компания', 'о нас', 'услуги', 'команда', 'бизнес'],
    restaurant: ['ресторан', 'кафе', 'меню', 'еда', 'кухня', 'доставка'],
    fitness: ['фитнес', 'спортзал', 'тренировки', 'спорт', 'йога'],
    education: ['курсы', 'обучение', 'школа', 'образование', 'университет'],
    travel: ['туризм', 'путешествия', 'отель', 'туры', 'travel'],
    music: ['музыка', 'концерт', 'группа', 'альбом', 'music'],
    event: ['мероприятие', 'событие', 'конференция', 'встреча', 'event'],
    realestate: ['недвижимость', 'квартиры', 'дома', 'аренда', 'продажа жилья'],
    crypto: ['криптовалюта', 'блокчейн', 'nft', 'crypto', 'web3'],
    startup: ['стартап', 'startup', 'инновации', 'технологии'],
  };

  let siteType = 'landing';
  for (const [type, words] of Object.entries(keywords)) {
    if (words.some(word => lowerDesc.includes(word))) {
      siteType = type;
      break;
    }
  }

  const colorSchemes = {
    синий: { primary: '#2563eb', secondary: '#3b82f6', accent: '#60a5fa', background: '#ffffff', text: '#1f2937' },
    голубой: { primary: '#0ea5e9', secondary: '#06b6d4', accent: '#22d3ee', background: '#ffffff', text: '#1f2937' },
    зеленый: { primary: '#16a34a', secondary: '#22c55e', accent: '#4ade80', background: '#ffffff', text: '#1f2937' },
    фиолетовый: { primary: '#7c3aed', secondary: '#8b5cf6', accent: '#a78bfa', background: '#ffffff', text: '#1f2937' },
    красный: { primary: '#dc2626', secondary: '#ef4444', accent: '#f87171', background: '#ffffff', text: '#1f2937' },
    оранжевый: { primary: '#ea580c', secondary: '#f97316', accent: '#fb923c', background: '#ffffff', text: '#1f2937' },
    желтый: { primary: '#ca8a04', secondary: '#eab308', accent: '#facc15', background: '#ffffff', text: '#1f2937' },
    розовый: { primary: '#db2777', secondary: '#ec4899', accent: '#f472b6', background: '#ffffff', text: '#1f2937' },
    черный: { primary: '#f59e0b', secondary: '#fbbf24', accent: '#fcd34d', background: '#0f172a', text: '#f1f5f9' },
    темный: { primary: '#6366f1', secondary: '#818cf8', accent: '#a5b4fc', background: '#111827', text: '#f9fafb' },
  };

  let colors = { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#a78bfa', background: '#ffffff', text: '#1f2937' };
  for (const [colorName, scheme] of Object.entries(colorSchemes)) {
    if (lowerDesc.includes(colorName)) {
      colors = scheme;
      break;
    }
  }

  const styleKeywords = {
    modern: ['современный', 'модерн', 'modern', 'стильный'],
    minimal: ['минимализм', 'минималистичный', 'простой', 'minimal', 'clean'],
    bold: ['яркий', 'bold', 'смелый', 'выразительный', 'насыщенный'],
    playful: ['игровой', 'веселый', 'playful', 'fun', 'детский'],
    elegant: ['элегантный', 'elegant', 'изысканный', 'премиум'],
    dark: ['темный', 'dark', 'черный', 'ночной'],
  };

  let style: 'modern' | 'minimal' | 'bold' | 'playful' | 'elegant' | 'dark' = 'modern';
  for (const [styleName, words] of Object.entries(styleKeywords)) {
    if (words.some(word => lowerDesc.includes(word))) {
      style = styleName as typeof style;
      break;
    }
  }

  const interactive = lowerDesc.includes('игра') || lowerDesc.includes('game') || 
                     lowerDesc.includes('интерактив') || lowerDesc.includes('interactive');

  return {
    title: extractTitle(description),
    description,
    colors,
    sections: getSectionsForType(siteType),
    style,
    interactive,
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
    game: ['game-hero', 'game-canvas', 'leaderboard', 'instructions'],
    app: ['app-hero', 'app-interface', 'features', 'footer'],
    ecommerce: ['hero', 'products', 'features', 'footer'],
    portfolio: ['hero', 'about', 'projects', 'contact'],
    landing: ['hero', 'features', 'cta', 'footer'],
    blog: ['hero', 'articles', 'categories', 'footer'],
    corporate: ['hero', 'services', 'about', 'team', 'contact'],
    restaurant: ['hero', 'menu', 'about', 'contact'],
    fitness: ['hero', 'programs', 'trainers', 'pricing'],
    education: ['hero', 'courses', 'teachers', 'pricing'],
    travel: ['hero', 'destinations', 'tours', 'booking'],
    music: ['music-hero', 'albums', 'events', 'contact'],
    event: ['event-hero', 'schedule', 'speakers', 'register'],
    realestate: ['hero', 'properties', 'search', 'contact'],
    crypto: ['hero', 'features', 'tokenomics', 'roadmap'],
    startup: ['hero', 'problem-solution', 'product', 'team', 'cta'],
  };
  
  return sectionMap[type] || ['hero', 'features', 'footer'];
};

export const generateFullHTML = (config: SiteConfig): string => {
  const sections = config.sections.map(section => generateSection(section, config)).join('\n');
  
  const styleVariations = {
    modern: 'font-family: Inter, -apple-system, sans-serif;',
    minimal: 'font-family: "Helvetica Neue", Arial, sans-serif; letter-spacing: -0.02em;',
    bold: 'font-family: "Arial Black", sans-serif; font-weight: 900;',
    playful: 'font-family: "Comic Sans MS", cursive;',
    elegant: 'font-family: "Georgia", serif; letter-spacing: 0.02em;',
    dark: 'font-family: "Courier New", monospace;',
  };
  
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
    body { 
      ${styleVariations[config.style]}
      background-color: ${config.colors.background};
      color: ${config.colors.text};
    }
    .smooth-scroll { scroll-behavior: smooth; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .animate-on-scroll { animation: fadeIn 0.6s ease-out; }
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

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-on-scroll');
        }
      });
    });
    
    document.querySelectorAll('section').forEach(section => observer.observe(section));
  </script>
</body>
</html>
  `.trim();
};

const generateSection = (type: string, config: SiteConfig): string => {
  const generators: Record<string, (config: SiteConfig) => string> = {
    hero: generateHero,
    'game-hero': generateGameHero,
    'game-canvas': generateGameCanvas,
    'leaderboard': generateLeaderboard,
    'instructions': generateInstructions,
    'app-hero': generateAppHero,
    'app-interface': generateAppInterface,
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
    destinations: generateDestinations,
    tours: generateTours,
    booking: generateBooking,
    'music-hero': generateMusicHero,
    albums: generateAlbums,
    events: generateEvents,
    'event-hero': generateEventHero,
    schedule: generateSchedule,
    speakers: generateSpeakers,
    register: generateRegister,
    properties: generateProperties,
    search: generateSearch,
    tokenomics: generateTokenomics,
    roadmap: generateRoadmap,
    'problem-solution': generateProblemSolution,
    product: generateProduct,
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

const generateGameHero = (config: SiteConfig): string => `
<header class="min-h-screen flex items-center justify-center px-6" style="background: linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.secondary} 100%);">
  <div class="text-center max-w-4xl text-white">
    <h1 class="text-7xl md:text-8xl font-black mb-6 animate-pulse">🎮 ${config.title}</h1>
    <p class="text-2xl mb-8">${config.description}</p>
    <button class="bg-white text-gray-900 px-12 py-5 rounded-full text-2xl font-bold hover:scale-110 transition transform shadow-2xl">
      ИГРАТЬ СЕЙЧАС
    </button>
  </div>
</header>
`;

const generateGameCanvas = (config: SiteConfig): string => `
<section id="game" class="py-20 px-6" style="background-color: ${config.colors.background};">
  <div class="max-w-4xl mx-auto">
    <canvas id="gameCanvas" class="w-full border-4 rounded-2xl shadow-2xl mx-auto" style="border-color: ${config.colors.primary}; background: #000; height: 500px;"></canvas>
    <div class="flex justify-center gap-4 mt-8">
      <button onclick="startGame()" style="background-color: ${config.colors.primary}" class="text-white px-8 py-4 rounded-xl text-xl font-bold hover:scale-105 transition">
        ▶ Старт
      </button>
      <button onclick="pauseGame()" class="bg-gray-300 px-8 py-4 rounded-xl text-xl font-bold hover:bg-gray-400 transition">
        ⏸ Пауза
      </button>
      <button onclick="resetGame()" class="bg-gray-300 px-8 py-4 rounded-xl text-xl font-bold hover:bg-gray-400 transition">
        🔄 Рестарт
      </button>
    </div>
  </div>
  <script>
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 500;
    
    let score = 0;
    let gameRunning = false;
    let player = { x: canvas.width / 2, y: canvas.height - 50, width: 50, height: 50, speed: 5 };
    let obstacles = [];
    
    function drawPlayer() {
      ctx.fillStyle = '${config.colors.primary}';
      ctx.fillRect(player.x, player.y, player.width, player.height);
    }
    
    function drawObstacles() {
      obstacles.forEach(obs => {
        ctx.fillStyle = '${config.colors.accent}';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      });
    }
    
    function updateGame() {
      if (!gameRunning) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      obstacles.forEach((obs, i) => {
        obs.y += 3;
        if (obs.y > canvas.height) {
          obstacles.splice(i, 1);
          score++;
        }
      });
      
      if (Math.random() < 0.02) {
        obstacles.push({ x: Math.random() * (canvas.width - 30), y: 0, width: 30, height: 30 });
      }
      
      drawPlayer();
      drawObstacles();
      
      ctx.fillStyle = 'white';
      ctx.font = '24px Arial';
      ctx.fillText('Счет: ' + score, 20, 40);
      
      requestAnimationFrame(updateGame);
    }
    
    function startGame() {
      if (!gameRunning) {
        gameRunning = true;
        updateGame();
      }
    }
    
    function pauseGame() {
      gameRunning = false;
    }
    
    function resetGame() {
      score = 0;
      obstacles = [];
      player.x = canvas.width / 2;
      gameRunning = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && player.x > 0) player.x -= player.speed;
      if (e.key === 'ArrowRight' && player.x < canvas.width - player.width) player.x += player.speed;
    });
  </script>
</section>
`;

const generateLeaderboard = (config: SiteConfig): string => `
<section id="leaderboard" class="py-20 px-6 bg-gray-900 text-white">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-12">🏆 Таблица лидеров</h2>
    <div class="space-y-4">
      ${[1, 2, 3, 4, 5].map(i => `
        <div class="flex items-center justify-between p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition">
          <div class="flex items-center gap-4">
            <span class="text-3xl font-bold" style="color: ${config.colors.accent}">#${i}</span>
            <span class="text-xl">Игрок ${i}</span>
          </div>
          <span class="text-2xl font-bold" style="color: ${config.colors.primary}">${(6 - i) * 1000} очков</span>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`;

const generateInstructions = (config: SiteConfig): string => `
<section id="instructions" class="py-20 px-6" style="background-color: ${config.colors.background};">
  <div class="max-w-3xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-12">📖 Как играть</h2>
    <div class="grid md:grid-cols-2 gap-8">
      ${[
        { icon: '⌨️', title: 'Управление', desc: 'Используйте стрелки на клавиатуре' },
        { icon: '🎯', title: 'Цель', desc: 'Набрать максимальное количество очков' },
        { icon: '⚡', title: 'Скорость', desc: 'Игра ускоряется со временем' },
        { icon: '💎', title: 'Бонусы', desc: 'Собирайте специальные предметы' },
      ].map(inst => `
        <div class="p-6 bg-white rounded-2xl shadow-lg text-center">
          <div class="text-5xl mb-4">${inst.icon}</div>
          <h3 class="text-xl font-bold mb-2">${inst.title}</h3>
          <p class="text-gray-600">${inst.desc}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`;

const generateAppHero = (config: SiteConfig): string => `
<header class="min-h-screen flex items-center justify-center px-6" style="background: linear-gradient(to bottom right, ${config.colors.background}, ${config.colors.primary}20);">
  <div class="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">
    <div>
      <h1 class="text-6xl font-bold mb-6">${config.title}</h1>
      <p class="text-xl mb-8 opacity-80">${config.description}</p>
      <div class="flex gap-4">
        <button style="background-color: ${config.colors.primary}" class="text-white px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90">
          Начать бесплатно
        </button>
        <button class="border-2 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50">
          Демо
        </button>
      </div>
    </div>
    <div class="h-96 rounded-2xl shadow-2xl" style="background: linear-gradient(135deg, ${config.colors.secondary}, ${config.colors.accent});"></div>
  </div>
</header>
`;

const generateAppInterface = (config: SiteConfig): string => `
<section id="interface" class="py-20 px-6" style="background-color: ${config.colors.background};">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-16">Интерфейс приложения</h2>
    <div class="bg-white rounded-3xl shadow-2xl p-8 border-4" style="border-color: ${config.colors.primary}">
      <div class="grid md:grid-cols-3 gap-6 mb-8">
        <input type="text" placeholder="Введите данные..." class="px-6 py-4 border-2 rounded-xl text-lg focus:outline-none focus:border-purple-500">
        <select class="px-6 py-4 border-2 rounded-xl text-lg focus:outline-none focus:border-purple-500">
          <option>Выберите опцию</option>
          <option>Вариант 1</option>
          <option>Вариант 2</option>
        </select>
        <button style="background-color: ${config.colors.primary}" class="text-white py-4 rounded-xl text-lg font-semibold hover:opacity-90">
          Выполнить
        </button>
      </div>
      <div class="h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-xl">
        Результат появится здесь
      </div>
    </div>
  </div>
</section>
`;

const generateDestinations = (config: SiteConfig): string => `
<section id="destinations" class="py-20 px-6">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-16">Популярные направления</h2>
    <div class="grid md:grid-cols-3 gap-8">
      ${['Париж', 'Токио', 'Нью-Йорк', 'Рим', 'Бали', 'Дубай'].map((city, i) => `
        <div class="group cursor-pointer">
          <div class="h-80 rounded-2xl overflow-hidden mb-4 relative">
            <div class="absolute inset-0 bg-gradient-to-br from-${['blue', 'pink', 'yellow', 'red', 'green', 'purple'][i]}-400 to-${['purple', 'red', 'orange', 'pink', 'blue', 'indigo'][i]}-600"></div>
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 class="text-3xl font-bold">${city}</h3>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`;

const generateTours = (config: SiteConfig): string => `
<section id="tours" class="py-20 px-6 bg-gray-50">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-16">Туры</h2>
    <div class="grid md:grid-cols-2 gap-8">
      ${[1, 2, 3, 4].map(i => `
        <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition">
          <div class="h-64 bg-gradient-to-br from-blue-${300 + i * 100} to-purple-${400 + i * 100}"></div>
          <div class="p-6">
            <h3 class="text-2xl font-bold mb-2">Тур ${i}</h3>
            <p class="text-gray-600 mb-4">${5 + i} дней / ${4 + i} ночей</p>
            <div class="flex justify-between items-center">
              <span class="text-3xl font-bold" style="color: ${config.colors.primary}">от ${(i + 1) * 30000}₽</span>
              <button style="background-color: ${config.colors.primary}" class="text-white px-6 py-2 rounded-lg">Забронировать</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`;

const generateBooking = (config: SiteConfig): string => `
<section id="booking" class="py-20 px-6">
  <div class="max-w-3xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-12">Забронировать тур</h2>
    <form class="bg-white p-8 rounded-2xl shadow-xl space-y-6">
      <div class="grid md:grid-cols-2 gap-6">
        <input type="text" placeholder="Ваше имя" class="px-6 py-4 border-2 rounded-xl focus:outline-none focus:border-purple-500">
        <input type="email" placeholder="Email" class="px-6 py-4 border-2 rounded-xl focus:outline-none focus:border-purple-500">
        <input type="date" class="px-6 py-4 border-2 rounded-xl focus:outline-none focus:border-purple-500">
        <input type="number" placeholder="Количество человек" class="px-6 py-4 border-2 rounded-xl focus:outline-none focus:border-purple-500">
      </div>
      <button style="background-color: ${config.colors.primary}" class="w-full text-white py-4 rounded-xl text-lg font-semibold">
        Отправить заявку
      </button>
    </form>
  </div>
</section>
`;

const generateMusicHero = (config: SiteConfig): string => `
<header class="min-h-screen flex items-center justify-center px-6" style="background: linear-gradient(to bottom, #000, ${config.colors.primary});">
  <div class="text-center text-white">
    <h1 class="text-8xl font-black mb-6">🎵 ${config.title}</h1>
    <p class="text-2xl mb-8 opacity-90">${config.description}</p>
    <button style="background-color: ${config.colors.accent}" class="text-black px-12 py-5 rounded-full text-xl font-bold hover:scale-105 transition">
      ▶ СЛУШАТЬ
    </button>
  </div>
</header>
`;

const generateAlbums = (config: SiteConfig): string => `
<section id="albums" class="py-20 px-6 bg-black text-white">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-16">Альбомы</h2>
    <div class="grid md:grid-cols-4 gap-6">
      ${[1, 2, 3, 4, 5, 6, 7, 8].map(i => `
        <div class="group cursor-pointer">
          <div class="aspect-square bg-gradient-to-br from-purple-${400 + i * 50} to-pink-${500 + i * 50} rounded-xl mb-3 hover:scale-105 transition"></div>
          <h3 class="font-bold">Альбом ${i}</h3>
          <p class="text-sm text-gray-400">202${i}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`;

const generateEvents = (config: SiteConfig): string => `
<section id="events" class="py-20 px-6">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-16">Концерты</h2>
    <div class="space-y-4">
      ${[1, 2, 3, 4].map(i => `
        <div class="flex justify-between items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
          <div>
            <h3 class="text-2xl font-bold">${i} мая 2024</h3>
            <p class="text-gray-600">Город ${i}, Арена</p>
          </div>
          <button style="background-color: ${config.colors.primary}" class="text-white px-8 py-3 rounded-lg font-semibold">
            Билеты
          </button>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`;

const generateEventHero = (config: SiteConfig): string => `
<header class="min-h-screen flex items-center justify-center px-6" style="background: linear-gradient(135deg, ${config.colors.primary}, ${config.colors.secondary});">
  <div class="text-center text-white max-w-4xl">
    <h1 class="text-7xl font-black mb-6">${config.title}</h1>
    <p class="text-2xl mb-4">${config.description}</p>
    <p class="text-3xl font-bold mb-8">📅 15-17 июня 2024</p>
    <button class="bg-white text-gray-900 px-12 py-5 rounded-xl text-xl font-bold hover:scale-105 transition">
      Зарегистрироваться
    </button>
  </div>
</header>
`;

const generateSchedule = (config: SiteConfig): string => `
<section id="schedule" class="py-20 px-6">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-16">Программа</h2>
    <div class="space-y-6">
      ${[
        { time: '09:00', title: 'Регистрация', desc: 'Приветственный кофе' },
        { time: '10:00', title: 'Открытие', desc: 'Вступительное слово' },
        { time: '11:00', title: 'Доклад 1', desc: 'Основная тема' },
        { time: '12:30', title: 'Обед', desc: 'Нетворкинг' },
        { time: '14:00', title: 'Панельная дискуссия', desc: 'Q&A сессия' },
      ].map((item, i) => `
        <div class="flex gap-6 items-start p-6 bg-white rounded-xl shadow-lg">
          <div class="text-2xl font-bold" style="color: ${config.colors.primary}">${item.time}</div>
          <div>
            <h3 class="text-xl font-bold mb-1">${item.title}</h3>
            <p class="text-gray-600">${item.desc}</p>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`;

const generateSpeakers = (config: SiteConfig): string => generateTeam(config).replace('Наша команда', 'Спикеры');

const generateRegister = (config: SiteConfig): string => `
<section id="register" class="py-20 px-6" style="background-color: ${config.colors.primary};">
  <div class="max-w-2xl mx-auto text-center text-white">
    <h2 class="text-5xl font-bold mb-6">Зарегистрируйтесь</h2>
    <p class="text-xl mb-8">Количество мест ограничено!</p>
    <form class="bg-white p-8 rounded-2xl text-left space-y-4">
      <input type="text" placeholder="Имя и фамилия" class="w-full px-6 py-4 border-2 rounded-xl focus:outline-none">
      <input type="email" placeholder="Email" class="w-full px-6 py-4 border-2 rounded-xl focus:outline-none">
      <input type="tel" placeholder="Телефон" class="w-full px-6 py-4 border-2 rounded-xl focus:outline-none">
      <button style="background-color: ${config.colors.primary}" class="w-full text-white py-4 rounded-xl text-lg font-bold">
        Зарегистрироваться
      </button>
    </form>
  </div>
</section>
`;

const generateProperties = (config: SiteConfig): string => generateProducts(config).replace('Наши товары', 'Объекты недвижимости').replace('Товар', 'Квартира');

const generateSearch = (config: SiteConfig): string => `
<section id="search" class="py-20 px-6 bg-gray-50">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-12">Поиск недвижимости</h2>
    <div class="bg-white p-8 rounded-2xl shadow-xl">
      <div class="grid md:grid-cols-4 gap-4 mb-6">
        <select class="px-6 py-4 border-2 rounded-xl">
          <option>Тип</option>
          <option>Квартира</option>
          <option>Дом</option>
        </select>
        <select class="px-6 py-4 border-2 rounded-xl">
          <option>Комнат</option>
          <option>1</option>
          <option>2</option>
          <option>3+</option>
        </select>
        <input type="text" placeholder="Район" class="px-6 py-4 border-2 rounded-xl">
        <input type="text" placeholder="Цена до" class="px-6 py-4 border-2 rounded-xl">
      </div>
      <button style="background-color: ${config.colors.primary}" class="w-full text-white py-4 rounded-xl text-lg font-bold">
        Найти
      </button>
    </div>
  </div>
</section>
`;

const generateTokenomics = (config: SiteConfig): string => `
<section id="tokenomics" class="py-20 px-6">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-16">Токеномика</h2>
    <div class="grid md:grid-cols-2 gap-12">
      <div class="space-y-6">
        ${[
          { label: 'Total Supply', value: '1,000,000,000' },
          { label: 'Liquidity', value: '40%' },
          { label: 'Team', value: '15%' },
          { label: 'Marketing', value: '20%' },
          { label: 'Community', value: '25%' },
        ].map(item => `
          <div class="flex justify-between items-center p-4 bg-gray-100 rounded-xl">
            <span class="font-semibold">${item.label}</span>
            <span class="text-2xl font-bold" style="color: ${config.colors.primary}">${item.value}</span>
          </div>
        `).join('')}
      </div>
      <div class="flex items-center justify-center">
        <div class="w-80 h-80 rounded-full" style="background: conic-gradient(${config.colors.primary} 0% 40%, ${config.colors.secondary} 40% 55%, ${config.colors.accent} 55% 75%, #e5e7eb 75% 100%);"></div>
      </div>
    </div>
  </div>
</section>
`;

const generateRoadmap = (config: SiteConfig): string => `
<section id="roadmap" class="py-20 px-6 bg-gray-900 text-white">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-16">Roadmap</h2>
    <div class="space-y-8">
      ${['Q1 2024: Launch', 'Q2 2024: Exchange Listings', 'Q3 2024: NFT Collection', 'Q4 2024: Metaverse Integration'].map((phase, i) => `
        <div class="flex gap-6 items-start">
          <div class="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold" style="background-color: ${config.colors.primary}">
            ${i + 1}
          </div>
          <div class="flex-1 p-6 bg-gray-800 rounded-xl">
            <h3 class="text-2xl font-bold mb-2">${phase.split(':')[0]}</h3>
            <p class="text-gray-400">${phase.split(':')[1]}</p>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`;

const generateProblemSolution = (config: SiteConfig): string => `
<section id="problem" class="py-20 px-6">
  <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
    <div class="p-8 bg-red-50 rounded-2xl">
      <h2 class="text-4xl font-bold mb-6 text-red-600">❌ Проблема</h2>
      <p class="text-lg text-gray-700">Существующие решения сложны, дороги и неэффективны. Пользователи тратят слишком много времени.</p>
    </div>
    <div class="p-8 bg-green-50 rounded-2xl">
      <h2 class="text-4xl font-bold mb-6 text-green-600">✅ Решение</h2>
      <p class="text-lg text-gray-700">Наш продукт упрощает процесс в 10 раз, экономит деньги и время благодаря инновационному подходу.</p>
    </div>
  </div>
</section>
`;

const generateProduct = (config: SiteConfig): string => `
<section id="product" class="py-20 px-6 bg-gray-50">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-16">Наш продукт</h2>
    <div class="grid md:grid-cols-3 gap-8">
      ${[
        { icon: '⚡', title: 'Быстро', desc: 'Работает в 10 раз быстрее' },
        { icon: '🔒', title: 'Безопасно', desc: 'Enterprise-grade security' },
        { icon: '🎯', title: 'Точно', desc: '99.9% accuracy rate' },
        { icon: '💰', title: 'Выгодно', desc: 'Экономия до 70%' },
        { icon: '🌐', title: 'Глобально', desc: 'Работает в 150+ странах' },
        { icon: '📱', title: 'Удобно', desc: 'Интуитивный интерфейс' },
      ].map(item => `
        <div class="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
          <div class="text-6xl mb-4">${item.icon}</div>
          <h3 class="text-2xl font-bold mb-3">${item.title}</h3>
          <p class="text-gray-600">${item.desc}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`;