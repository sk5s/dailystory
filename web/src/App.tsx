import AccountSettings from './components/features/account/AccountSettings';
import DefaultLayout from './layouts/DefaultLayout';
import { DateNavigator } from './components/features/calendar/DateNavigator';
import { BackendProvider } from '@/BackendContext';
import { AccountProvider } from '@/components/features/account/AccountContext';
import { ThemeProvider } from '@/components/ui/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BackendProvider>
        <AccountProvider>
          <DefaultLayout>
            <h1 className='text-2xl font-bold my-4'>Daily Story</h1>
            <DateNavigator />
            <AccountSettings />
          </DefaultLayout>
        </AccountProvider>
      </BackendProvider>
    </ThemeProvider>
  );
}

export default App;
