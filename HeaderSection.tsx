import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Layout,
  Settings,
} from 'lucide-react';
import bgHeader from '@/assets/bgHeader1.png';
import { DynamicTabs } from '@/components/ui/tabs';
import MobileNavigation from '@/components/MobileNavigation';

const HeaderSection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);

  // This function now correctly identifies all routes.
  const getCurrentTab = () => {
    const path = location.pathname;
    if (path.includes('/greeting/templates')) return 'templates'; // <--- THE FIX
    if (path.includes('/greeting/settings')) return 'settings';
    if (path.includes('/greeting/notifications')) return 'notifications';
    return 'overview';
  };

  const [activeTab, setActiveTab] = useState(getCurrentTab());

  useEffect(() => {
    setActiveTab(getCurrentTab());
  }, [location]);

  const tabs = [
    {
      id: 'overview',
      name: 'Overview',
      icon: <Layout className="mr-2 h-5 w-5" />,
      path: '/greeting',
    },
    {
      id: 'templates',
      name: 'All Templates',
      icon: <Box className="mr-2 h-5 w-5" />,
      path: '/greeting/templates',
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <Settings className="mr-2 h-5 w-5" />,
      path: '/greeting/settings',
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 880);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const target = event.target;
      if (
        isActionMenuOpen &&
        !target.closest('#mobile-action-menu') &&
        !target.closest('#mobile-fab')
      ) {
        setIsActionMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActionMenuOpen]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const selectedTab = tabs.find((tab) => tab.id === tabId);
    if (selectedTab) {
      setTimeout(() => {
        navigate(selectedTab.path);
      }, 0);
    }
  };

  return (
    <div className="mb-8">
      <div
        style={{ backgroundImage: `url(${bgHeader})` }}
        className="relative mb-6 flex flex-col items-center justify-between overflow-hidden rounded-xl bg-app-primary bg-cover bg-no-repeat text-white transition-all duration-300 ease-in-out sm:flex-col sm:p-6"
      >
        <div className="relative mb-4 flex w-full flex-col items-center justify-between sm:mb-6 sm:flex-row">
          <div className="text-center sm:text-start">
            <h1
              className="mb-1 mt-2 text-2xl font-bold sm:text-3xl"
              id="dashboard"
            >
              Greeting Card
            </h1>
            <p className="text-white" id="total-projects">
              Manage your greeting cards and their details.
            </p>
          </div>
        </div>
        <DynamicTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        {isMobile && (
          <MobileNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            navItems={tabs}
          />
        )}
      </div>
    </div>
  );
};

export default HeaderSection;