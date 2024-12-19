import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { CreateExperienceDto } from '../dto/create-experience.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { IJWTUserData } from 'src/common/interfaces/jwt.interface';
import { ExperienceService } from '../services/experience.service';
import { UpdateExperienceDto } from '../dto/update-experience.dto';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
@ApiBearerAuth()
@ApiTags('Experience')
@UseFilters(HttpExceptionFilter)
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: CreateExperienceDto,
    @CurrentUser() user: IJWTUserData,
    @Res() response: Response,
  ) {
    const create = await this.experienceService.save(user.id, data);

    if (create) {
      response.json({
        statusCode: HttpStatus.CREATED,
        message: 'Experience registered successfully',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id') experience_id: string,
    @CurrentUser() user: IJWTUserData,
    @Body() data: UpdateExperienceDto,
    @Res() response: Response,
  ) {
    const update = this.experienceService.update(user.id, experience_id, data);

    if (update) {
      response.json({
        statusCode: HttpStatus.CREATED,
        message: 'Experience updated successfully',
      });
    }
  }

  @ApiDefaultResponse({
    description: 'Default error response for unexpected issues',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id') experienceID: string,
    @CurrentUser() user: IJWTUserData,
  ) {
    await this.experienceService.delete(experienceID, user.id);
  }
}
