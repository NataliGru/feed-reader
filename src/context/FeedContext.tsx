import React, { createContext, useContext, useState, useEffect } from 'react';
import * as feedService from '../api/feeds';
import { useUserContext } from './UserContext'; // Імпортуйте ваш контекст користувача тут
import { Feed } from '../types/Feed';

type FeedContextType = {
  feeds: Feed[];
  loadFeeds: () => void;
  addFeed: (newFeed: Feed) => void;
  editFeed: (editedfeed: Feed) => void;
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
    const localStorageFeed = JSON.parse(localStorage.getItem('feeds') || '[]')
    
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

    if (localStorageFeed) {
      setFeeds(prev => [localStorageFeed, ...prev])
    }
  };

  const addFeed = (newFeed: Feed) => {
    if (user) {
      try {
        feedService.addFeed(newFeed);

        setFeeds(prev => [newFeed, ...prev]);
      } catch (error) {
        console.error('Error adding feed:', error);
      }
    }
  };
  
  const editFeed = (editedFeed: Feed) => {
    const isFeedExist = feeds.some(feed => feed.id === editedFeed.id);

    if (isFeedExist) {
      try {
        feedService.editFeed(editedFeed);

        setFeeds(prev => prev.map(
          feed => feed.id === editedFeed.id ? editedFeed : feed
        ));
      } catch (error) {
        console.error('Error editing feed:', error);
      }
    }
  };

  const deleteFeed = async (feedId:  number) => {
    const feedForDelete = feeds.find(feed => feed.id === feedId);

    if (feedForDelete) {
      try {
        setFeeds(prev => prev.filter(
          feed => feed.id === feedId
          ));

          feedService.deleteFeed(feedId);
      } catch (error) {
        console.error('Error deleting feed:', error);
        setFeeds(prev => [feedForDelete, ...prev]);
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
