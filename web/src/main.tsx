import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CalendarPage } from '@/components/features/calendar/CalendarPage.tsx';
import { SettingsPage } from './components/features/settings/SettingsPage.tsx';

import { HashRouter, Route, Routes } from "react-router";
import { BackendProvider } from '@/BackendContext';
import { AccountProvider } from '@/components/features/account/AccountContext';
import { ThemeProvider } from '@/components/ui/theme-provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BackendProvider>
          <AccountProvider>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </AccountProvider>
        </BackendProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
)
