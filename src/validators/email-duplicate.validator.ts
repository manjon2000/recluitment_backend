import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: 'emailDuplicate', async: true })
@Injectable()
export class EmailDuplicateValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async validate(value: string): Promise<boolean> {
    const exist = await this.repository.findOne({ where: { email: value } });
    return exist ? false : true;
  }

  defaultMessage(): string {
    return 'Email already exists';
  }
}
