import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PostsResolver } from './posts.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [PostsResolver],
})
export class PostsModule {}
