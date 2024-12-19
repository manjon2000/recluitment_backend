import { UUID } from 'crypto';
import { UserExperience } from 'src/modules/user/entities/user-experience.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('experiences')
export class Experience {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'timestamp', nullable: false })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_date: Date;

  @Column({ type: 'boolean', nullable: false, default: () => false })
  is_current: boolean;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
  })
  created_at: Date;

  @OneToMany(
    () => UserExperience,
    (userExperience) => userExperience.experience,
    { cascade: true },
  )
  userExperiences: UserExperience[];
}
