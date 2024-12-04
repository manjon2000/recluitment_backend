import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateExperienceDto } from '../dto/create-experience.dto';
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('Experience')
@Controller('experience')
export class ExperienceController {
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() CreateExperienceDto: CreateExperienceDto,
    @Res() response: Response,
  ) {
    response.json(CreateExperienceDto);
  }
}
