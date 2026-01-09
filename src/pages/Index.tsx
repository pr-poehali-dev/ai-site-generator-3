import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { analyzeSiteDescription, generateFullHTML } from '@/lib/siteGenerator';

interface GeneratedSite {
  id: string;
  description: string;
  preview: string;
  timestamp: Date;
  htmlCode: string;
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
      const siteConfig = analyzeSiteDescription(description);
      const htmlCode = generateFullHTML(siteConfig);
      
      const newSite: GeneratedSite = {
        id: Date.now().toString(),
        description: description,
        preview: htmlCode,
        timestamp: new Date(),
        htmlCode: htmlCode,
      };

      setGeneratedSites((prev) => [newSite, ...prev]);
      setCurrentPreview(newSite.preview);
      setIsGenerating(false);
      setDescription('');
      
      toast({
        title: 'Сайт создан!',
        description: 'Ваш полноценный сайт готов к использованию',
      });
    }, 1500);
  };

  const handleDownload = (htmlCode: string, siteId: string) => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `website-${siteId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Скачивание началось!',
      description: 'HTML файл сохранён на ваш компьютер',
    });
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
            {currentPreview && generatedSites.length > 0 ? (
              <Card className="p-6 animate-scale-in shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Превью сайта</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(generatedSites[0].htmlCode, generatedSites[0].id)}
                  >
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать HTML
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
                  className="p-6 hover:shadow-xl transition-all"
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
                  <div 
                    className="border rounded-md overflow-hidden bg-white h-32 cursor-pointer mb-4 hover:ring-2 hover:ring-primary transition"
                    onClick={() => setCurrentPreview(site.preview)}
                  >
                    <iframe
                      srcDoc={site.preview}
                      className="w-full h-full pointer-events-none scale-[0.3] origin-top-left"
                      style={{ width: '333%', height: '333%' }}
                      title={`Preview ${site.id}`}
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full"
                    onClick={() => handleDownload(site.htmlCode, site.id)}
                  >
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать HTML
                  </Button>
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