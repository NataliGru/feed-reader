import { client } from '../utils/client';

export const getComments = (feedId: string) => client.get('/users', {
  params: {
    postId: feedId,
  }
});


