import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from 'src/modules/user/entities/user-profile.entity';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfile: Repository<UserProfile>,
    @InjectRepository(Profile)
    private readonly profile: Repository<Profile>,
  ) {}
}
