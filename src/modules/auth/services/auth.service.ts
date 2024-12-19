import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UUID } from 'crypto';
import { UserRoles } from 'src/modules/user/entities/user-role.entity';
import { RoleService } from 'src/modules/roles/services/role.service';
import { ERoles } from 'src/common/enums/roles.enum';
import { signUpDTO, signInDTO } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(UserRoles)
    private readonly userRoleRepository: Repository<UserRoles>,
    private readonly roleRepository: RoleService,
  ) {}

  async signUp(signUpDTO: signUpDTO) {
    try {
      const { username, email, password } = signUpDTO;

      await this.checkUserExists(username, email);

      const user = this.userRepository.create({
        id: uuidv4() as `${string}-${string}-${string}-${string}-${string}`,
        username,
        email,
        password: await bcrypt.hash(password, this.SALT_ROUNDS),
      });

      const savedUser = await this.userRepository.save(user);

      if (!savedUser) {
        throw new InternalServerErrorException('Failed to save user');
      }

      const saveRole = await this.insertDefaultRoleByRegister(savedUser.id);

      if (!saveRole) {
        await this.userRepository.delete(savedUser);
        throw new ConflictException();
      }

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async signIn(signInDTO: signInDTO): Promise<{ access_token: string }> {
    const { email, password } = signInDTO;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('CREDENTIALS_INVALID');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('CREDENTIALS_INVALID');
    }

    const payload = { id: user.id, username: user.username };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  private async checkUserExists(
    username: string,
    email: string,
  ): Promise<void> {
    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });
    if (existingUser) {
      throw new UnauthorizedException('CREDENTIALS_INVALID');
    }
  }

  private async insertDefaultRoleByRegister(id: UUID): Promise<boolean> {
    const userRole = await this.roleRepository.getRoleByName(ERoles.USER);

    if (!userRole) {
      return false;
    }

    const userRoleRelation = this.userRoleRepository.create({
      user_id: id,
      role_id: userRole.id,
    });

    const roles = await this.userRoleRepository.save(userRoleRelation);

    return roles ? true : false;
  }
}
