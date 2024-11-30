import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Min } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  constructor() {
    super();
  }
  @Min(3)
  email?: string;
}
