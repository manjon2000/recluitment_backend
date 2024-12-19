import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExperienceDto } from '../dto/create-experience.dto';
import { Experience } from '../entities/experience.entity';
import { v4 as uuidv4 } from 'uuid';
import { uuid } from 'src/common/interfaces/common.interface';
import { UserExperience } from 'src/modules/user/entities/user-experience.entity';
import { UpdateExperienceDto } from '../dto/update-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(UserExperience)
    private readonly userExperienceRepository: Repository<UserExperience>,
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
  ) {}

  async save(userID: string, data: CreateExperienceDto) {
    try {
      const experienceData = {
        ...data,
        id: uuidv4() as uuid,
      };

      const experience = this.experienceRepository.create(experienceData);
      const savedExperience = await this.experienceRepository.save(experience);

      if (!savedExperience) {
        throw new InternalServerErrorException('Failed to save experience');
      }

      const userExperienceData = {
        user_id: userID as uuid,
        experience_id: savedExperience.id,
      };

      const userExperience =
        this.userExperienceRepository.create(userExperienceData);
      const savedUserExperience =
        await this.userExperienceRepository.save(userExperience);

      if (!savedUserExperience) {
        throw new InternalServerErrorException(
          'Failed to save user-experience relation',
        );
      }

      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while saving experience data',
        error.message,
      );
    }
  }

  async update(
    userID: string,
    experienceID: string,
    data: UpdateExperienceDto,
  ) {
    try {
      const userExperience = await this.userExperienceRepository.findOne({
        where: {
          user_id: userID as uuid,
          experience_id: experienceID as uuid,
        },
      });

      const experience = await this.experienceRepository.findOne({
        where: {
          id: experienceID as uuid,
        },
      });

      if (!userExperience || !experience) {
        throw new NotFoundException();
      }

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          experience[key] = value;
        }
      });

      const updatedExperience =
        await this.experienceRepository.save(experience);

      if (!updatedExperience) {
        throw new InternalServerErrorException();
      }

      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while saving experience data',
        error.message,
      );
    }
  }

  async delete(experienceID: string, userID: string): Promise<boolean> {
    try {
      const userOwnsExperience = await this.userExperienceRepository.findOne({
        where: {
          user_id: userID as uuid,
          experience_id: experienceID as uuid,
        },
      });

      if (!userOwnsExperience) {
        throw new UnauthorizedException();
      }

      console.log(userOwnsExperience);
      await this.experienceRepository.delete(experienceID as uuid);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
