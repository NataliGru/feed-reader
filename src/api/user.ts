import { client } from '../utils/client';

export const getUser = (username: string) => client.get('/users', {
  params: {
    username,
  }
});


