import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ETypeMultimedia } from 'src/common/enums/multimedia.enum';
import { UUID } from 'crypto';

@Entity()
export class Multimedia {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  path: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ETypeMultimedia })
  mimetype: ETypeMultimedia;
}
