import { UnauthorizedException } from '@nestjs/common';

export class CredentialsNotMatchException extends UnauthorizedException {
  constructor() {
    super('These credentials do not match our records!');
  }
}
