import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  public async getMe(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { user_id: userId },
      select: ['user_id', 'email', 'full_name', 'avatar_url', 'created_at', 'updated_at'],
    });

    return {
      user,
    };
  }
}
