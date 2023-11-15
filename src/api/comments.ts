import { client } from '../utils/client';

export const getComments = (feedId: string) => client.get('/comments', {
  params: {
    postId: feedId,
  }
});


export const addComment = (postId: number, name: string, email: string, body: string ) => {
  client.post('/comments', {
    postId, 
    name,
    email, 
    body, 
  })
};

export const editFeed = (commentId: number, body: string) => {
  client.patch(`/comments/${commentId}`, {
    body, 
  })
};

export const deleteFeed = (commentId: number) => {
  client.delete(`/comments/${commentId}`);
};
