import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { useContainer, ValidationError } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import { formatErrors } from './common/helpers/format-errors.helper';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Recluitment APP')
    .setDescription('Application recluitment tech.')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(cookieParser());
  app.enableCors({
    origin: '*',
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETED'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Convierte automáticamente el DTO a la clase correspondiente
      whitelist: true, // Elimina propiedades que no están en el DTO
      forbidNonWhitelisted: true, // Lanza un error si hay propiedades no permitidas
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = formatErrors(errors);
        return new BadRequestException({
          statusCode: 400,
          message: formattedErrors,
          error: 'Bad Request',
        });
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
