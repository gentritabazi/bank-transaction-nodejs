import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getOneByEmail(email: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: email })
      .getOne();
  }

  async create(request: CreateUserDto): Promise<User> {
    const querybuilder = this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: request.email });

    const user = await querybuilder.getOne();

    if (user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          errors: ['Email must be unique.'],
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const attributes = {
      ...request,
      password: await this.hashPassword(request.password),
    };

    const newUser = await this.userRepository.save(attributes);

    return newUser;
  }

  async hashPassword(passport: string) {
    return await bcrypt.hash(passport, 10);
  }
}
