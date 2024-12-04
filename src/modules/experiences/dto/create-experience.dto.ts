import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateExperienceDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @IsOptional()
  @MinLength(2)
  @MaxLength(255)
  description: string | null;
}
