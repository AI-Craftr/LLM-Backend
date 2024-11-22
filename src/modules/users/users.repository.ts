import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private userEntity: Repository<User>,
  ) {}

  public async create(user: Partial<User>): Promise<User> {
    const newUser = this.userEntity.create(user);
    return await this.userEntity.save(newUser);
  }

  public async findOneBy(
    where: FindOptionsWhere<User> | FindOptionsWhere<User>[],
  ) {
    return this.userEntity.findOneBy(where);
  }
}
