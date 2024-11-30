import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { ERoles } from 'src/common/enums/roles.enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Roles)
    private readonly roleRepository: Repository<Roles>,
  ) {}

  async getRoleByName(name: ERoles): Promise<Roles> {
    return await this.roleRepository.findOne({
      where: { name: name },
    });
  }
}
