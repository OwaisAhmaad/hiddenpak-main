import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private repo: UsersRepository) {}

  findById(id: string) {
    return this.repo.findById(id);
  }

  findByEmail(email: string) {
    return this.repo.findOne({ email });
  }

  async setRefreshToken(id: string, token: string) {
    const hashed = await bcrypt.hash(token, 10);
    return this.repo.updateById(id, { refreshToken: hashed });
  }

  clearRefreshToken(id: string) {
    return this.repo.updateById(id, { refreshToken: null });
  }

  async createAdmin(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    return this.repo.create({ email, password: hashed, role: 'admin' });
  }

  async updateById(id: string, update: Record<string, any>) {
    return this.repo.updateById(id, update);
  }
}
