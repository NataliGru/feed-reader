import React, { createContext, useContext, useState, useEffect } from 'react';
import * as feedService from '../api/feeds';
import { useUserContext } from './UserContext'; // Імпортуйте ваш контекст користувача тут
import { Feed } from '../types/Feed';

type FeedContextType = {
  feeds: Feed[];
  loadFeeds: () => void;
  addFeed: (title: string, body: string) => Promise<void>;
  editFeed: (feedId: number, title: string, body: string) => Promise<void>;
  deleteFeed: (feedId: number) => void;
};

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export const useFeedContext = () => {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error('useFeedContext must be used within a FeedContextProvider');
  }
  return context;
};

export const FeedContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [feeds, setFeeds] = useState<Feed[]>([]);

  const { user } = useUserContext();
  
  const loadFeeds = () => {
    if (user) {
      feedService.getFeeds(user.id)
      .then(Response => {
        const feedData = Response.data;
        setFeeds(feedData);
      })
      .catch(Error => {
        console.error('Error loading feeds:', Error);
      });
    }
  };

  const addFeed = async (title: string, body: string) => {
    if (user) {
      try {
        const response = await feedService.addFeed(user.id, title, body);

        setFeeds(prev => [response.data, ...prev]);
      } catch (error) {
        console.error('Error adding feed:', error);
      }
    }
  };
  
  const editFeed = async (feedId: number, title: string, body: string) => {
    const isFeedExist = feeds.some(feed => feed.id === feedId);

    if (isFeedExist) {
      try {
        const response = await feedService.editFeed(feedId, title, body);

        setFeeds(prev => prev.map(
          feed => feed.id === feedId ? response.data : feed
        ));
      } catch (error) {
        console.error('Error editing feed:', error);
      }
    }
  };

  const deleteFeed = async (feedId:  number) => {
    const isFeedExist = feeds.some(feed => feed.id === feedId);

    if (isFeedExist) {
      try {
        feedService.deleteFeed(feedId);
        
        setFeeds(prev => prev.filter(
          feed => feed.id === feedId
        ));
      } catch (error) {
        console.error('Error deleting feed:', error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      loadFeeds();
    }
  }, [user]);

  const value = {
    feeds,
    loadFeeds,
    addFeed,
    editFeed,
    deleteFeed,
  };

  return (
    <FeedContext.Provider value={value}>
      {children}
    </FeedContext.Provider>
  );
};
