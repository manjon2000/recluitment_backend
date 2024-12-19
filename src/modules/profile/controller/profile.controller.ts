import { Body, Controller, Post, Res, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { ProfileService } from '../services/profile.service';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { IJWTUserData } from 'src/common/interfaces/jwt.interface';
import { Response } from 'express';
import { CreateProfileDto } from '../dto/create-profile.dto';

@ApiBearerAuth()
@ApiTags('Profile')
@UseFilters(HttpExceptionFilter)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  async create(
    @Body() data: CreateProfileDto,
    @CurrentUser() user: IJWTUserData,
    @Res() response: Response,
  ) {}

  @Post('create')
}
