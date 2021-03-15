import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorMsg } from './error-msg.entity';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, ErrorMsg])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
