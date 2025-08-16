import React from 'react';
import { useGreetingCard } from '@/contexts/GreetingCardContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Eye, Type, FilePlus, Settings, Image } from 'lucide-react';


type StatCardProps = {
  title: string;
  value: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconBg: string;
  iconColor: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, iconBg, iconColor }) => (
  <Card>
    <CardContent className="flex items-center gap-4 p-6">
      <div className={`flex items-center justify-center rounded-lg p-3 ${iconBg}`}>
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <div className="flex flex-col">
        <p className="text-sm text-muted-foreground">{title}</p>
        <span className="text-2xl font-bold">{value}</span>
      </div>
    </CardContent>
  </Card>
);

const Overview = () => {
  const { templates, activeFonts, pageTitle, pageDescription } = useGreetingCard();
  const totalTemplates = templates.length;
  const activeTemplates = templates.filter((t) => t.active);

  const overviewMetrics = [
    {
      title: 'Total Templates',
      value: totalTemplates,
      icon: Package,
      iconBg: 'bg-blue-100 dark:bg-blue-900',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Active Templates',
      value: activeTemplates.length,
      icon: Eye,
      iconBg: 'bg-emerald-100 dark:bg-emerald-900',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'Enabled Fonts',
      value: activeFonts.length,
      icon: Type,
      iconBg: 'bg-purple-100 dark:bg-purple-900',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {overviewMetrics.map((metric) => (
          <StatCard key={metric.title} {...metric} />
        ))}
      </section>

      {/* Dashboard Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button asChild size="lg" className="w-full bg-[#136EFC] hover:bg-[#136EFC]/90">
                <Link to="/greeting/templates">
                  <FilePlus className="mr-2 h-5 w-5" /> Upload New Template
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full">
                <Link to="/greeting/settings">
                  <Settings className="mr-2 h-5 w-5" /> Adjust Page Settings
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Active Templates Preview */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Active Template Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {activeTemplates.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {activeTemplates.slice(0, 6).map((template) => (
                    <div key={template.id} className="relative group rounded-lg overflow-hidden shadow-md">
                      <img
                        src={template.image}
                        alt={template.name}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute bottom-0 w-full bg-black/50 text-white text-center text-sm p-2">
                        {template.name}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-40 flex-col items-center justify-center text-muted-foreground">
                  <Image className="h-8 w-8 mb-2" />
                  No active templates
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Live Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Main Title</p>
                <p className="text-lg font-semibold">{pageTitle}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="text-md">{pageDescription}</p>
              </div>
              <div className="flex items-center text-sm text-emerald-600">
                ● Content is live
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Overview;
