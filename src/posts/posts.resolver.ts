import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { from, Observable } from 'rxjs';
import { map, throwIfEmpty } from 'rxjs/operators';
import { PostsService } from '../database/posts.service';
import { UsersService } from '../database/users.service';
import { Post, Comment, User } from '../graphql.schema.generated';
import { PostNotFoundError } from './post-notfound.error';
import { PrismaService } from '../database/prisma.service';

@Resolver('Post')
export class PostsResolver {
  constructor(
    private readonly users: UsersService,
    private readonly posts: PostsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query()
  getPostById(@Args() id: string): Observable<Post> {
    return from(this.posts.post({ id: id })).pipe(
      throwIfEmpty(() => new PostNotFoundError(id)),
      map((p) => {
        const { id, title, content, createdAt, updatedAt } = p;
        return {
          id,
          title,
          content,
          createdAt,
          updatedAt,
        };
      }),
    );
  }

  @Query()
  getAllPosts(
    @Args() keyword: string,
    @Args() skip: number,
    @Args() take: number,
  ): Observable<Post[]> {
    return from(
      this.posts.posts({
        skip: skip,
        take: take,
        where: {
          OR: [
            { title: { contains: keyword } },
            { content: { contains: keyword } },
          ],
        },
      }),
    ).pipe(
      map((pa) => {
        return pa.map((p) => {
          const { id, title, content, createdAt, updatedAt } = p;
          return {
            id,
            title,
            content,
            createdAt,
            updatedAt,
          };
        });
      }),
    );
  }

  @ResolveField()
  comments(@Parent() { id }: Post): Observable<Comment[]> {
    return from(
      this.prisma.post.findUnique({
        where: { id: id },
        include: {
          comments: true,
        },
      }),
    ).pipe(
      throwIfEmpty(() => new PostNotFoundError(id)),
      map((p) => {
        const { comments } = p;
        return comments.map((c) => {
          const { id, content } = c;
          return { id, content } as Comment;
        });
      }),
    );
  }

  @ResolveField()
  author(@Parent() { id }: Post): Observable<User> {
    return from(
      this.prisma.post.findUnique({
        where: { id: id },
        include: {
          author: true,
        },
      }),
    ).pipe(
      throwIfEmpty(() => new PostNotFoundError(id)),
      map((p) => {
        const { author } = p;
        const { id, email, name } = author;
        return { id, email, name } as User;
      }),
    );
  }
}
