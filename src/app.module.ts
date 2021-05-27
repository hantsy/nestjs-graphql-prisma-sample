import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        context: ({ req, res }) => ({ req, res }),
        typePaths: ['./src/*/*.gql'],
        installSubscriptionHandlers: true,
        resolverValidationOptions: {
          requireResolversForResolveType: 'warn',
        },
        buildSchemaOptions: {
          dateScalarMode: 'isoDate',
        },
        definitions: {
          // will generate .ts types from gql schema files
          path: join(process.cwd(), 'src/graphql.schema.generated.ts'),
          outputAs: 'interface',
        },
        debug: true,
        introspection: true,
        playground: true,
        cors: false,
        
      }),
    }),
    DatabaseModule,
    PostsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
