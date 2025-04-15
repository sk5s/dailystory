import React from 'react';
import { Account } from './Account';
import { useAccountContext } from './AccountContext';
import { cn } from '@/lib/utils';

interface AccountsProps {
  onAccountSelect: (username: string) => void;
  selectedUser: string | null;
  full?: boolean;
}

const Accounts: React.FC<AccountsProps> = ({ onAccountSelect, selectedUser, full }) => {
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
          <div className={cn(
            "flex flex-row gap-4",
            full ? "flex-wrap" : ""
          )}>
            {users.map((username) => (
              <div key={username}>
                <Account key={username} username={username} selectedUser={selectedUser} onClick={() => handleUserSelect(username)} full={full} />
              </div>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Accounts;
