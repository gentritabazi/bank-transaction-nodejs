import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { DepositTransactionDto } from '../dto/deposit-transaction.dto';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('api/transactions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('deposit')
  @ApiOperation({
    summary: 'Perform a deposit transaction',
  })
  async deposit(@Body() request: DepositTransactionDto): Promise<any> {
    const transaction = await this.transactionService.deposit(request);

    return {
      message: 'The process was completed successfully!',
      resources: transaction,
    };
  }

  @Post('withdrawal')
  @ApiOperation({
    summary: 'Perform a withdrawal transaction',
  })
  async withdrawal(@Body() request: CreateTransactionDto): Promise<any> {
    const transaction = await this.transactionService.withdrawal(request);

    return {
      message: 'The process was completed successfully!',
      resources: transaction,
    };
  }
}
