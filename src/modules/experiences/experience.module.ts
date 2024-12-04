import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Experience } from './entities/experience.entity';
import { ExperienceController } from './controller/experience.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Experience])],
  controllers: [ExperienceController],
  providers: [TypeOrmModule],
})
export class ExperienceModule {}
