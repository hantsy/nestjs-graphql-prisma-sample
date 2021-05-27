import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [UsersResolver],
})
export class UsersModule {}
