import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { signInDTO, signUpDTO } from '../dto/auth.dto';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() userDTO: signUpDTO) {
    const result = await this.authService.signUp(userDTO);
    if (result) {
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User registered successfully',
      };
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDTO: signInDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.signIn(loginDTO);
    if (result) {
      response.cookie('token', result.access_token);
    }
  }
}
