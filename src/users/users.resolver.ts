import { Args, Query, Resolver } from '@nestjs/graphql';
import { from, Observable } from 'rxjs';
import { map, throwIfEmpty } from 'rxjs/operators';
import { UsersService } from '../database/users.service';
import { User } from '../graphql.schema.generated';
import { UserNotFoundError } from './user-notfound.error';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly users: UsersService) {}

  @Query('author')
  getUserById(@Args() id: string): Observable<User> {
    return from(this.users.user({ id: id })).pipe(
      throwIfEmpty(() => new UserNotFoundError(id)),
      map((u) => {
        const { id, email, name } = u;
        return { id, email, name };
      }),
    );
  }
}
