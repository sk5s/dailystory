import AccountSettings from './components/features/account/AccountSettings';
import DefaultLayout from './layouts/DefaultLayout';
import { DateNavigator } from './components/features/calendar/DateNavigator';

function App() {
  return (
    <DefaultLayout>
      <h1 className='text-2xl font-bold my-4'>Daily Story</h1>
      <DateNavigator />
      <AccountSettings />
    </DefaultLayout>
  );
}

export default App;
