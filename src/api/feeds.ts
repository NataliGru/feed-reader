import { client } from '../utils/client';

export const getFeeds = (userId: string) => client.get('/posts', {
  params: {
    userId,
  }
});

export const addFeed = () => {};

export const deleteFeed = () => {};
