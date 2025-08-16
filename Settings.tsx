import React from 'react';
import { useGreetingCard } from '@/contexts/GreetingCardContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Settings: React.FC = () => {
  const { pageTitle, setPageTitle, pageDescription, setPageDescription, activeFonts, setActiveFonts, predefinedFonts } = useGreetingCard();

  const handleFontToggle = (fontId: string) => {
    setActiveFonts(
      activeFonts.includes(fontId)
        ? activeFonts.filter((id) => id !== fontId)
        : [...activeFonts, fontId]
    );
    toast.info(`Font status changed.`);
  };
  
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader><CardTitle>General Settings</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="pageTitle">Page Title</Label>
              <Input id="pageTitle" value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pageDescription">Page Description</Label>
              <Input id="pageDescription" value={pageDescription} onChange={(e) => setPageDescription(e.target.value)} />
            </div>
            <Button onClick={() => toast.success('Changes saved!')}>Save Changes</Button>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card>
          <CardHeader><CardTitle>Font Management</CardTitle></CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-600">Enable or disable fonts that users can select.</p>
            <div className="space-y-4">
              {predefinedFonts.map((font) => (
                <div key={font.id} className="flex items-center justify-between">
                  <Label htmlFor={`font-${font.id}`} className="font-normal">{font.name}</Label>
                  <Switch id={`font-${font.id}`} checked={activeFonts.includes(font.id)} onCheckedChange={() => handleFontToggle(font.id)} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Settings;