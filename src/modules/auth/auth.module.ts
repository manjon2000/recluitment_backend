import { Module } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { AuthController } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { EmailDuplicateValidator } from 'src/validators/email-duplicate.validator';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Roles } from '../roles/entities/role.entity';
import { UserRoles } from '../user/entities/user-role.entity';
import { RoleService } from '../roles/services/role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Roles, UserRoles]),
    JwtModule.register({
      global: true,
      secret: 'jwt_secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    RoleService,
    EmailDuplicateValidator,
    AuthService,
    JwtStrategy,
  ],
  exports: [UserService, TypeOrmModule, EmailDuplicateValidator],
})
export class AuthModule {}
