import { BadRequestException } from '@nestjs/common';

export class UserEmailMustBeUniqueExpection extends BadRequestException {
  constructor() {
    super(['Email must be unique!']);
  }
}
