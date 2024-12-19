import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { UserProfile } from '../user/entities/user-profile.entity';
import { User } from '../user/entities/user.entity';
import { ProfileController } from './controller/profile.controller';
import { ProfileService } from './services/profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, UserProfile, User])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
