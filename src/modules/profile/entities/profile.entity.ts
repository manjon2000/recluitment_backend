import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UUID } from 'crypto';

@Entity('user_profile')
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  user_id: UUID;

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
}
