import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { EmailDuplicateValidator } from 'src/validators/email-duplicate.validator';

export class signUpDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @Validate(EmailDuplicateValidator, {
    message: 'The email is already registered',
  })
  email: string;

  @IsNotEmpty()
  password: string;
}

export class signInDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
