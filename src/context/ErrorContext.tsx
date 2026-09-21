import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ErrorContextType {
  showError: (message: string) => void;
  hideError: () => void;
  error: string | null;
  isVisible: boolean;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showError = useCallback((message: string) => {
    setError(message);
    setIsVisible(true);
  }, []);

  const hideError = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <ErrorContext.Provider value={{ showError, hideError, error, isVisible }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};
