import { Bind, Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Req } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { ErrorMsgDto } from './error-msg.dto';

@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get('/monitor')
  @Bind(Req())
  async monitor(@Query() query: ErrorMsgDto): Promise<any> {
    await this.appService.save(query);
    return {
      success: true,
    };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/create')
  create(): Promise<User> {
    return this.appService.create();
  }
}
