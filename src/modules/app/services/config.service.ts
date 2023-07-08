import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/modules/users/entities/user.entity';
import { Transaction } from 'src/modules/transactions/entities/transaction.entity';

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`Config error missing env ${key}.`);
    }

    return value;
  }

  public getPort() {
    return this.getValue('PORT');
  }

  public isProduction() {
    const mode = this.getValue('APP_MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USERNAME'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_DATABASE'),
      entities: [User, Transaction],
      ssl: this.isProduction(),
    };
  }
}

const configService = new ConfigService(process.env);

export { configService };
