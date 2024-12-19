import { UUID } from 'crypto';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Experience } from 'src/modules/experiences/entities/experience.entity';

@Entity('user_experiences')
export class UserExperience {
  @PrimaryColumn('uuid')
  @Exclude()
  user_id: UUID;

  @PrimaryColumn('uuid')
  @Exclude()
  experience_id: UUID;

  @ManyToOne(() => Experience, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'experience_id' })
  experience: Experience;
}
