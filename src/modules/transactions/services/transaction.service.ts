import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { DepositTransactionDto } from '../dto/deposit-transaction.dto';
import { UserService } from '../../users/services/user.service';
import { UserNotFoundException } from '../../users/exceptions/user-not-found.expection';
import { InsufficientBalanceException } from '../exceptions/Insufficient-balance.exception';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private userService: UserService,
  ) {}

  async deposit(depositTransactionDto: DepositTransactionDto): Promise<any> {
    const { user_id, amount } = depositTransactionDto;

    const user = await this.userService.getOneById(user_id);

    if (!user) {
      throw new UserNotFoundException();
    }

    const transaction = new Transaction();
    transaction.user_id = user_id;
    transaction.amount = amount;

    await this.transactionRepository.save(transaction);

    user.balance = Number(user.balance) + amount;
    await this.userService.update(user);

    return { transaction, user };
  }

  async withdrawal(createTransactionDto: CreateTransactionDto): Promise<any> {
    const { user_id, amount } = createTransactionDto;

    const user = await this.userService.getOneById(user_id);

    if (!user) {
      throw new UserNotFoundException();
    }

    if (user.balance < amount) {
      throw new InsufficientBalanceException();
    }

    const transaction = new Transaction();
    transaction.user_id = user_id;
    transaction.amount = amount;

    await this.transactionRepository.save(transaction);

    user.balance = Number(user.balance) - amount;
    user.bonus_balance =
      Number(user.bonus_balance) + this.calculateBonus(amount);
    await this.userService.update(user);

    return { transaction, user };
  }

  private calculateBonus(amount: number): number {
    const bonusPercentage = 0.05;
    const bonusThreshold = 100;

    if (amount > bonusThreshold) {
      const excessAmount = amount - bonusThreshold;

      return excessAmount * bonusPercentage;
    }

    return 0;
  }
}
