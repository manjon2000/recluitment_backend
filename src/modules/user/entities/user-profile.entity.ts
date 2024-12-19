import { Exclude } from 'class-transformer';
import { UUID } from 'crypto';
import { Profile } from 'src/modules/profile/entities/profile.entity';
import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('user_profile')
export class UserProfile {
  @PrimaryColumn('uuid')
  @Exclude()
  user_id: UUID;

  @PrimaryColumn('uuid')
  @Exclude()
  profile_id: UUID;

  @OneToOne(() => Profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
