import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../users/services/user.service';
import { jwtContanst } from '../contants/jwt';
import { LoginDto } from '../dto/login.dto';
import { CredentialsNotMatchException } from '../exceptions/credentials-not-match.exception';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!(await user.validatePassword(password))) {
      return null;
    }

    return user;
  }

  async login(request: LoginDto) {
    const user = await this.userService.getOneByEmail(request.email);

    if (!user) {
      throw new CredentialsNotMatchException();
    }

    if (!(await user.validatePassword(request.password))) {
      throw new CredentialsNotMatchException();
    }

    const payload = { email: user.email, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn: jwtContanst.expiresIn,
    };
  }
}
