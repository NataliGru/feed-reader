
import { createContext, useContext } from 'react';

const FeedContext = createContext<undefined>(undefined);

export const useFeedContext = () => {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error('useFeedContext must be used within a FeedContextProvider');
  }
  return context;
};

