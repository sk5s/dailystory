import React, { useCallback, useEffect, useState } from 'react';
import { useBackend } from "@/BackendContext";
import { Account } from './Account';

interface AccountsProps {
  onAccountSelect: (username: string) => void;
  selectedUser: string | null;
}

const Accounts: React.FC<AccountsProps> = ({ onAccountSelect, selectedUser }) => {
  const [users, setUsers] = useState<string[]>([]);
  // const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { getUserList, isReady } = useBackend();

  const updateUserList = useCallback(() => {
    const availableUsers = getUserList();
    setUsers(availableUsers);
  }, [getUserList]);

  useEffect(() => {
    if (isReady){
      updateUserList();
    }
  }, [updateUserList, isReady]);

  const handleUserSelect = (username: string) => {
    if (onAccountSelect) {
      onAccountSelect(username);
    }
  };

  return (
    <div className="accounts-container">
      {users.length > 0 ? (
        <>
          <div className="flex flex-row gap-4">
            {users.map((username) => (
              <Account key={username} username={username} selectedUser={selectedUser} onClick={() => handleUserSelect(username)} />
            ))}
          </div>
        </>
      ) : (
        <p>No accounts available</p>
      )}
    </div>
  );
};

export default Accounts;
