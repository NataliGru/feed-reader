import { Feed } from '../types/Feed';
import { client } from '../utils/client';

export const getFeeds = (userId: number) => client.get('/posts', {
  params: {
    userId,
  }
});

export const addFeed = async (newFeed: Feed) => {
  const response = await client.post('/posts', newFeed);

  return response.data;
};

export const editFeed = async (editedFeed: Feed) => {
  const response = await client.patch(`/posts/${editedFeed.id}`, editFeed);

  return response.data;
};

export const deleteFeed = (postId: number) => {
  client.delete(`/posts/${postId}`);
};
