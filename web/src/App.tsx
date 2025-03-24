import AccountSettings from './components/features/account/AccountSettings';
import DefaultLayout from './layouts/DefaultLayout';

function App() {
  return (
    <DefaultLayout>
      <h1 className='text-2xl font-bold my-4'>Daily Story</h1>
      <AccountSettings />
    </DefaultLayout>
  );
}

export default App;
