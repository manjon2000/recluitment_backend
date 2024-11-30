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

  @OneToMany(
    () => UserExperience,
    (userExperience) => userExperience.experience,
  )
  userExperiences: UserExperience[];
}
