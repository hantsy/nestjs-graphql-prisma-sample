import { ApolloError } from 'apollo-server-express';

export class PostNotFoundError extends ApolloError {
  constructor(id: string) {
    super('Post: ' + id + ' was not found.', 'POST_NOT_FOUND');
  }
}
