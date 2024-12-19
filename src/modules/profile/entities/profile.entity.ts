import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { UUID } from 'crypto';
import { UserProfile } from 'src/modules/user/entities/user-profile.entity';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  web: string;

  @Column({ nullable: true })
  linkedin: string;

  @Column({ nullable: true })
  github: string;

  @Column({ nullable: true })
  gitlab: string;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.profile, {
    onDelete: 'CASCADE',
  })
  userProfile: UserProfile;
}
