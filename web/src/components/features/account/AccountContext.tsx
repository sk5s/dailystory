/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { useBackend } from "@/BackendContext";

interface AccountContextType {
  users: string[];
  selectedUser: string | null;
  updateUserList: () => void;
  setSelectedUser: (username: string) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUserState] = useState<string | null>(null);
  const { getUserList, isReady } = useBackend();

  const updateUserList = useCallback(() => {
    const availableUsers = getUserList();
    setUsers(availableUsers);
  }, [getUserList]);

  const setSelectedUser = (username: string) => {
    setSelectedUserState(username);
  };

  useEffect(() => {
    if (isReady) {
      updateUserList();
    }
  }, [isReady, updateUserList]);

  const contextValue = {
    users,
    selectedUser,
    updateUserList,
    setSelectedUser
  };

  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccountContext must be used within an AccountProvider');
  }
  return context;
};
