import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface GeneratedSite {
  id: string;
  description: string;
  preview: string;
  timestamp: Date;
}

const Index = () => {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSites, setGeneratedSites] = useState<GeneratedSite[]>([]);
  const [currentPreview, setCurrentPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast({
        title: 'Введите описание',
        description: 'Опишите какой сайт вы хотите создать',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const newSite: GeneratedSite = {
        id: Date.now().toString(),
        description: description,
        preview: generatePreviewHTML(description),
        timestamp: new Date(),
      };

      setGeneratedSites((prev) => [newSite, ...prev]);
      setCurrentPreview(newSite.preview);
      setIsGenerating(false);
      
      toast({
        title: 'Сайт создан!',
        description: 'Ваш сайт успешно сгенерирован',
      });
    }, 2000);
  };

  const generatePreviewHTML = (desc: string): string => {
    const lowerDesc = desc.toLowerCase();
    
    if (lowerDesc.includes('магазин') || lowerDesc.includes('товар')) {
      return `
        <div class="min-h-screen bg-white">
          <header class="border-b">
            <div class="container mx-auto px-6 py-4 flex justify-between items-center">
              <h1 class="text-2xl font-bold text-indigo-600">Магазин</h1>
              <nav class="flex gap-6">
                <a href="#" class="text-gray-700 hover:text-indigo-600">Каталог</a>
                <a href="#" class="text-gray-700 hover:text-indigo-600">О нас</a>
                <a href="#" class="text-gray-700 hover:text-indigo-600">Корзина</a>
              </nav>
            </div>
          </header>
          <main class="container mx-auto px-6 py-12">
            <h2 class="text-4xl font-bold mb-8">Популярные товары</h2>
            <div class="grid grid-cols-3 gap-6">
              <div class="border rounded-xl p-6 hover:shadow-lg transition">
                <div class="h-48 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg mb-4"></div>
                <h3 class="font-semibold mb-2">Товар 1</h3>
                <p class="text-gray-600 mb-4">Описание товара</p>
                <button class="w-full bg-indigo-600 text-white py-2 rounded-lg">Купить</button>
              </div>
              <div class="border rounded-xl p-6 hover:shadow-lg transition">
                <div class="h-48 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg mb-4"></div>
                <h3 class="font-semibold mb-2">Товар 2</h3>
                <p class="text-gray-600 mb-4">Описание товара</p>
                <button class="w-full bg-indigo-600 text-white py-2 rounded-lg">Купить</button>
              </div>
              <div class="border rounded-xl p-6 hover:shadow-lg transition">
                <div class="h-48 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg mb-4"></div>
                <h3 class="font-semibold mb-2">Товар 3</h3>
                <p class="text-gray-600 mb-4">Описание товара</p>
                <button class="w-full bg-indigo-600 text-white py-2 rounded-lg">Купить</button>
              </div>
            </div>
          </main>
        </div>
      `;
    }

    if (lowerDesc.includes('портфолио') || lowerDesc.includes('резюме')) {
      return `
        <div class="min-h-screen bg-white">
          <header class="border-b">
            <div class="container mx-auto px-6 py-6 text-center">
              <h1 class="text-4xl font-bold mb-2">Иван Иванов</h1>
              <p class="text-gray-600">Веб-разработчик</p>
            </div>
          </header>
          <main class="container mx-auto px-6 py-12">
            <section class="mb-16">
              <h2 class="text-3xl font-bold mb-6">О себе</h2>
              <p class="text-gray-700 text-lg">Создаю современные веб-приложения с фокусом на пользовательский опыт</p>
            </section>
            <section>
              <h2 class="text-3xl font-bold mb-6">Проекты</h2>
              <div class="grid grid-cols-2 gap-8">
                <div class="border rounded-xl overflow-hidden hover:shadow-lg transition">
                  <div class="h-64 bg-gradient-to-br from-purple-400 to-indigo-600"></div>
                  <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">Проект 1</h3>
                    <p class="text-gray-600">Описание проекта и технологии</p>
                  </div>
                </div>
                <div class="border rounded-xl overflow-hidden hover:shadow-lg transition">
                  <div class="h-64 bg-gradient-to-br from-pink-400 to-purple-600"></div>
                  <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">Проект 2</h3>
                    <p class="text-gray-600">Описание проекта и технологии</p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      `;
    }

    return `
      <div class="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-6xl font-bold mb-6 text-indigo-900">Добро пожаловать</h1>
          <p class="text-2xl text-gray-700 mb-8">${desc}</p>
          <button class="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition">
            Начать
          </button>
        </div>
      </div>
    `;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            AI Конструктор Сайтов
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Опишите какой сайт вам нужен — искусственный интеллект создаст его за секунды
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 animate-scale-in shadow-lg">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 text-foreground">
                Опишите ваш сайт
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Например: создай интернет-магазин для продажи одежды с минималистичным дизайном..."
                className="min-h-[200px] text-base resize-none"
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              size="lg"
              className="w-full text-lg h-14 font-semibold"
            >
              {isGenerating ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                  Генерирую сайт...
                </>
              ) : (
                <>
                  <Icon name="Sparkles" className="mr-2" size={20} />
                  Создать сайт
                </>
              )}
            </Button>

            <div className="mt-6 flex items-start gap-3 p-4 bg-muted rounded-lg">
              <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Чем подробнее вы опишете желаемый сайт, тем точнее будет результат. Укажите тип сайта, стиль, цвета и функции.
              </p>
            </div>
          </Card>

          <div className="space-y-6">
            {currentPreview ? (
              <Card className="p-6 animate-scale-in shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Превью сайта</h3>
                  <Button variant="outline" size="sm">
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать
                  </Button>
                </div>
                <div className="border rounded-lg overflow-hidden bg-white shadow-inner">
                  <iframe
                    srcDoc={currentPreview}
                    className="w-full h-[400px]"
                    title="Preview"
                    sandbox="allow-scripts"
                  />
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center border-dashed animate-fade-in">
                <Icon name="Globe" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Ваш сгенерированный сайт появится здесь
                </p>
              </Card>
            )}
          </div>
        </div>

        {generatedSites.length > 0 && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-8">История проектов</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedSites.map((site) => (
                <Card
                  key={site.id}
                  className="p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
                  onClick={() => setCurrentPreview(site.preview)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon name="FileText" size={20} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground mb-1">
                        {site.timestamp.toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      <p className="text-sm line-clamp-3">{site.description}</p>
                    </div>
                  </div>
                  <div className="border rounded-md overflow-hidden bg-white h-32">
                    <iframe
                      srcDoc={site.preview}
                      className="w-full h-full pointer-events-none scale-[0.3] origin-top-left"
                      style={{ width: '333%', height: '333%' }}
                      title={`Preview ${site.id}`}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
