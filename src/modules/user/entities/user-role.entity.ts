import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Roles } from 'src/modules/roles/entities/role.entity';
import { UUID } from 'crypto';

@Entity('user_roles')
export class UserRoles {
  @PrimaryColumn('uuid')
  user_id: UUID;

  @PrimaryColumn('uuid')
  role_id: UUID;

  @ManyToOne(() => User, (user) => user.userRoles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Roles, (role) => role.userRoles)
  @JoinColumn({ name: 'role_id' })
  role: Roles;
}
