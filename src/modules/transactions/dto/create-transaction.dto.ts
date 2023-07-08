import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsInt()
  @ApiProperty()
  user_id: number;

  @IsInt()
  @Min(1)
  @ApiProperty()
  amount: number;
}
