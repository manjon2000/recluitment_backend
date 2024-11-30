import { UUID } from 'crypto';
import { ERoles } from 'src/common/enums/roles.enum';
import { UserRoles } from 'src/modules/user/entities/user-role.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'enum', enum: ERoles })
  name: ERoles;

  @OneToMany(() => UserRoles, (userRole) => userRole.role)
  userRoles: UserRoles[];
}
