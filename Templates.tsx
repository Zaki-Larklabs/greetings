// --- Templates.tsx ---

import React, { useState } from 'react';
import { useGreetingCard } from '@/contexts/GreetingCardContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Upload, Trash2, Camera } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Templates: React.FC = () => {
    const { templates, setTemplates } = useGreetingCard();
    const [newImage, setNewImage] = useState<File | null>(null);
    const [newImageName, setNewImageName] = useState('');

    const handleUpload = () => {
        if (!newImageName || !newImage) {
            return toast.error('Please provide a name and select an image file.');
        }
        const newTemplate = {
            id: Date.now(),
            name: newImageName,
            image: URL.createObjectURL(newImage),
            active: true,
            author: 'Uploaded by user'
        };
        setTemplates([...templates, newTemplate]);
        toast.success('New template uploaded.');
    };

    const handleToggle = (id: number) => {
        setTemplates(
            templates.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
        );
        toast.info('Template status updated.');
    };

    return (
        <div>
          <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">All Templates </h2>
              <Dialog>
                <DialogTrigger asChild><Button><Upload className="mr-2 h-5 w-5" />Upload New</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Upload New Template</DialogTitle></DialogHeader>
                  <div className="space-y-4 py-4">
                    <Input placeholder="Template Name" value={newImageName} onChange={(e) => setNewImageName(e.target.value)} />
                    <Input type="file" onChange={(e) => e.target.files && setNewImage(e.target.files[0])} />
                    <Button onClick={handleUpload} className="w-full">Upload</Button>
                  </div>
                </DialogContent>
              </Dialog>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {templates.map((template) => (
                  <Card key={template.id} className="overflow-hidden">
                      <CardHeader>
                        <CardTitle className="truncate">{template.name}</CardTitle>
                        {/* Optional: Add a description or author credit */}
                        {template.author && (
                           <CardDescription className="flex items-center text-xs pt-1">
                             <Camera className="mr-1 h-3 w-3" /> {template.author}
                           </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <img src={template.image} alt={template.name} className="h-48 w-full rounded-md object-cover transition-transform hover:scale-105" />
                      </CardContent>
                      <CardFooter className="flex justify-between bg-muted/40 p-3">
                          <div className="flex items-center space-x-2">
                              <Switch id={`switch-${template.id}`} checked={template.active} onCheckedChange={() => handleToggle(template.id)} />
                              <Label htmlFor={`switch-${template.id}`}>{template.active ? 'Active' : 'Inactive'}</Label>
                          </div>
                          <Button variant="destructive" size="icon" onClick={() => {
                              setTemplates(templates.filter((t) => t.id !== template.id));
                              toast.warning('Template deleted.');
                          }}><Trash2 className="h-4 w-4" /></Button>
                      </CardFooter>
                  </Card>
              ))}
          </div>
        </div>
    );
};

export default Templates;