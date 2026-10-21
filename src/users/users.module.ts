import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';

@Module({
  providers: [UsersService],
  exports: [UsersService], //aqui inyectamos el userservices que esta en users.service.ts
})
export class UsersModule {}
