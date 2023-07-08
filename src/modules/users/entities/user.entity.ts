import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EntityBase } from '../../App/abstracts/entity.base';
import * as bcrypt from 'bcrypt';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity('users')
export class User extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column('decimal', { default: 0, precision: 10, scale: 2 })
  balance: number;

  @Column('decimal', { default: 0, precision: 10, scale: 2 })
  bonus_balance: number;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  public async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
