import { createContext, useContext } from 'react';

const CommentsContext = createContext<undefined>(undefined);

export const useCommentsContext = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error('useCommentsContext must be used within a CommentsContextProvider');
  }
  return context;
};
