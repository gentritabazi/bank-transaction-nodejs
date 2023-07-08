import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Hello world',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
