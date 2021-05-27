import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PrismaService } from './prisma.service';
import { UsersService } from './users.service';

@Module({
  providers: [PostsService, UsersService, PrismaService],
  exports: [PostsService, UsersService, PrismaService],
})
export class DatabaseModule {}
