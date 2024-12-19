import { IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateProfileDto {
  @IsOptional()
  @MinLength(5)
  @MaxLength(255)
  bio: string;

  @IsOptional()
  @MinLength(5)
  @MaxLength(255)
  web: string;

  @IsOptional()
  @MinLength(5)
  @MaxLength(255)
  linkedin: string;

  @IsOptional()
  @MinLength(5)
  @MaxLength(255)
  github: string;

  @IsOptional()
  @MinLength(5)
  @MaxLength(255)
  gitlab: string;
}
