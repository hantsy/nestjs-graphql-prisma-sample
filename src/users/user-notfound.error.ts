import { ApolloError } from 'apollo-server-express';

export class UserNotFoundError extends ApolloError {
  constructor(id: string) {
    super('User: ' + id + ' was not found.', 'USER_NOT_FOUND');
  }
}
