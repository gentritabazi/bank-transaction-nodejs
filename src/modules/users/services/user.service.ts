import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async getByEmail(email: string) {
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

    const newUser = await this.userRepository.save(request);

    return newUser;
  }
}
