import React, { lazy } from 'react';
import { Route, Outlet } from 'react-router-dom';

// Import the layout component for this module
import HeaderSection from '@/pages/Greeting/HeaderSection';

// Lazily load all the pages for the greeting module
const Overview = lazy(() => import('@/pages/Greeting/Overview'));
const Templates = lazy(() => import('@/pages/Greeting/Templates'));
const Settings = lazy(() => import('@/pages/Greeting/Settings'));


// This layout component wraps all the pages in this module
const GreetingLayout = () => {
  return (
    <div>
      <HeaderSection />
      <main className="mt-4">
        <Outlet />
      </main>
    </div>
  );
};

// Export the routes for the greeting module
export const greetingRoutes = [
  // The React Fragment <> is not needed here
  <Route
    path="/greeting"
    element={<GreetingLayout />}
    key="greeting-layout"
  >
    <Route index element={<Overview />} key="greeting-overview" />
    <Route path="templates" element={<Templates />} key="greeting-templates" />
    <Route path="settings" element={<Settings />} key="greeting-settings" />
  </Route>,
];