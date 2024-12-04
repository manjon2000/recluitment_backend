import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ExperienceModule } from './modules/experiences/experience.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'app_recluitment',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [],
      synchronize: true,
      migrationsRun: true,
      logging: true,
    }),
    AuthModule,
    UserModule,
    ExperienceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
