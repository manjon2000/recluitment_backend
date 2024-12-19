import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateExperienceDto {
  @IsOptional()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @IsOptional()
  @MinLength(2)
  @MaxLength(255)
  description: string | null;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  start_date: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  end_date: Date;

  @IsOptional()
  @IsBoolean()
  is_current: boolean;
}
