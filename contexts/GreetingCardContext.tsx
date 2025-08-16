import React, { createContext, useState, useContext, ReactNode } from 'react';

// --- This is our temporary, frontend-only dummy data ---
const DUMMY_TEMPLATES = [
  { 
    id: 1, 
    name: 'Abstract Celebration', 
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop', 
    active: true,
    author: 'Frank Eiffert on Unsplash'
  },
  { 
    id: 2, 
    name: 'Festive Lights', 
    image: 'https://images.unsplash.com/photo-1522120691854-531b71a7d6e1?q=80&w=800&auto=format&fit=crop', 
    active: true,
    author: 'Tim Mossholder on Unsplash'
  },
  { 
    id: 3, 
    name: 'Minimalist Greetings', 
    image: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=800&auto=format&fit=crop', 
    active: false,
    author: 'Joanna Kosinska on Unsplash'
  },
  {
    id: 4,
    name: 'Joyful Moments',
    image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=800&auto=format&fit=crop',
    active: true,
    author: 'Jakob Owens on Unsplash'
  },
];

const PREDEFINED_FONTS = [
    { id: 'arial', name: 'Arial' },
    { id: 'georgia', name: 'Georgia' },
    { id: 'helvetica', name: 'Helvetica' },
];
// --- End of dummy data ---

interface Template { 
  id: number; 
  name: string; 
  image: string; 
  active: boolean; 
  author?: string; // Optional author field for attribution
}
interface Font { id: string; name: string; }

interface GreetingCardContextType {
  pageTitle: string;
  setPageTitle: (title: string) => void;
  pageDescription: string;
  setPageDescription: (description: string) => void;
  templates: Template[];
  setTemplates: (templates: Template[]) => void;
  activeFonts: string[];
  setActiveFonts: (fonts: string[]) => void;
  predefinedFonts: Font[];
}

const GreetingCardContext = createContext<GreetingCardContextType | undefined>(undefined);

export const GreetingCardProvider = ({ children }: { children: ReactNode }) => {
  const [pageTitle, setPageTitle] = useState('Great Place to Work!');
  const [pageDescription, setPageDescription] = useState('Congratulations on Your Well-Deserved Promotion');
  const [templates, setTemplates] = useState<Template[]>(DUMMY_TEMPLATES);
  const [activeFonts, setActiveFonts] = useState<string[]>(['arial', 'georgia']);

  const value = {
    pageTitle, setPageTitle,
    pageDescription, setPageDescription,
    templates, setTemplates,
    activeFonts, setActiveFonts,
    predefinedFonts: PREDEFINED_FONTS,
  };

  return (
    <GreetingCardContext.Provider value={value}>
      {children}
    </GreetingCardContext.Provider>
  );
};

export const useGreetingCard = () => {
  const context = useContext(GreetingCardContext);
  if (!context) throw new Error('useGreetingCard must be used within a GreetingCardProvider');
  return context;
};