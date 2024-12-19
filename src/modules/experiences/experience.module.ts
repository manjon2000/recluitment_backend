import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { ExperienceController } from './controller/experience.controller';
import { ExperienceService } from './services/experience.service';
import { UserExperience } from '../user/entities/user-experience.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserExperience, Experience])],
  controllers: [ExperienceController],
  providers: [TypeOrmModule, ExperienceService],
})
export class ExperienceModule {}
