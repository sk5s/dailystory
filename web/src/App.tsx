import AccountSettings from './components/features/account/AccountSettings';
import DefaultLayout from './layouts/DefaultLayout';
import { useAccountContext } from './components/features/account/AccountContext';
import { NoAccountInstruction } from './components/features/account/NoAccountInstruction';
import Accounts from '@/components/features/account/Accounts';

function App() {
  const { users, selectedUser, setSelectedUser } = useAccountContext();
  return (
    <DefaultLayout>
      <h1 className='text-2xl font-bold my-4'>Daily Story</h1>
      {(users && !!users.length) ? (
        <>
          {selectedUser ? (
            <>
              <AccountSettings />
            </>
          ) : (
            <div className='min-h-[60vh] w-full flex flex-col justify-center items-center'>
              <Accounts onAccountSelect={(username) => {
                setSelectedUser(username);
              }} selectedUser={selectedUser} full={true} />
            </div>
          )}
        </>
      ) : (
        <div className='min-h-[60vh] flex justify-center items-center'>
          <NoAccountInstruction />
        </div>
      )}
    </DefaultLayout>
  );
}

export default App;
