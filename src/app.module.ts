import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        context: ({ req, res }) => ({ req, res }),
        typePaths: ['./src/*/*.graphql'],
        installSubscriptionHandlers: true,
        resolverValidationOptions: {
          requireResolversForResolveType: 'warn',
        },
        definitions: {
          // will generate .ts types from gql schema files
          path: join(process.cwd(), 'src/graphql.schema.generated.ts'),
          outputAs: 'class',
        },
        debug: true,
        introspection: true,
        playground: true,
        cors: false,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
