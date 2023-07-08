import { IsInt, Min } from 'class-validator';

export class DepositTransactionDto {
  @IsInt()
  user_id: number;

  @IsInt()
  @Min(1)
  amount: number;
}
