/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from 'react';

// 定義後端函式的類型
interface BackendFunctions {
  saveDiary: (username: string, content: string) => string|undefined;
  loadDiary: (username: string) => string;
  getUserList: () => string[];
}

// Context 的值類型
interface BackendContextValue {
  saveDiary: BackendFunctions['saveDiary'];
  loadDiary: BackendFunctions['loadDiary'];
  getUserList: BackendFunctions['getUserList'];
  isReady: boolean;
}

// 建立 Context，預設值為空實現
const BackendContext = createContext<BackendContextValue>({
  saveDiary: () => {return ""},
  loadDiary: () => {return ""},
  getUserList: () => {return []},
  isReady: false,
});

// Backend Provider 組件
export const BackendProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [backend, setBackend] = useState<BackendFunctions>({
    saveDiary: () => {return ""},
    loadDiary: () => {return ""},
    getUserList: () => {return []},
  });

  useEffect(() => {
    const checkBackend = () => {
      const app = (window as any).app as BackendFunctions | undefined;
      if (app && app.saveDiary && app.loadDiary && app.getUserList) {
        setBackend({
          saveDiary: app.saveDiary,
          loadDiary: app.loadDiary,
          getUserList: app.getUserList,
        });
        setIsReady(true);
      } else {
        console.log('Waiting for backend...');
        setTimeout(checkBackend, 100);
      }
    };
    checkBackend();
  }, []);

  const value: BackendContextValue = { ...backend, isReady };

  return <BackendContext.Provider value={value}>{children}</BackendContext.Provider>;
};

// 自訂 Hook
export const useBackend = (): BackendContextValue => {
  const context = useContext(BackendContext);
  if (!context) {
    throw new Error('useBackend must be used within a BackendProvider');
  }
  return context;
};