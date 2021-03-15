import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ErrorMsg } from './error-msg.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ErrorMsg)
    private ErrorMsgRepository: Repository<ErrorMsg>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async save(request): Promise<any> {
    console.log(request);
    const { a: msg, b: url, c: column, d: row } = request;

    return this.ErrorMsgRepository.save({
      msg,
      url,
      column,
      row,
    });
  }

  async create(): Promise<User> {
    const users = this.usersRepository.findAndCount();
    console.log(users);
    return this.usersRepository.save({
      id: 1,
      firstName: 'asdf',
      lastName: 'vzcv',
      isActive: false,
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
