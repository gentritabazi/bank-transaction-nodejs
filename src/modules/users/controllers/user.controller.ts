import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() request: CreateUserDto) {
    return {
      statusCode: HttpStatus.OK,
      user: await this.userService.create(request),
    };
  }
}
