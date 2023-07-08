import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

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

  @Get('sorted-by-bonus')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Retrieve a sorted list of users based on their bonus balances in ascending order',
  })
  async getSortedUsersByBonus() {
    return this.userService.getUsersSortedByBonus();
  }
}
