import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoles } from './entities/user-role.entity';
import { Roles } from '../roles/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRoles, Roles])],
  controllers: [UserController],
  providers: [UserService, TypeOrmModule],
})
export class UserModule {}
