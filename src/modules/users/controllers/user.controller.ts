import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Register a new user',
  })
  async create(@Body() request: CreateUserDto) {
    await this.userService.create(request);

    return {
      success: true,
      message: 'The process was completed successfully!',
    };
  }
}
