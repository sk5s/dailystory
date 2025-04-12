import React from 'react';
import { Account } from './Account';
import { useAccountContext } from './AccountContext';

interface AccountsProps {
  onAccountSelect: (username: string) => void;
  selectedUser: string | null;
}

const Accounts: React.FC<AccountsProps> = ({ onAccountSelect, selectedUser }) => {
  const { users } = useAccountContext();

  const handleUserSelect = (username: string) => {
    if (onAccountSelect) {
      onAccountSelect(username);
    }
  };

  return (
    <>
      {users.length > 0 ? (
        <>
          <div className="flex flex-row gap-4">
            {users.map((username) => (
              <div key={username}>
                <Account key={username} username={username} selectedUser={selectedUser} onClick={() => handleUserSelect(username)} />
              </div>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Accounts;
