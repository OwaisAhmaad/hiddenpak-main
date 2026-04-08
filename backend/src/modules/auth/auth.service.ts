import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.users.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const tokens = await this.generateTokens(
      (user._id as any).toString(),
      user.email,
    );
    await this.users.setRefreshToken(
      (user._id as any).toString(),
      tokens.refreshToken,
    );
    return tokens;
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.users.findById(userId);
    if (!user?.refreshToken) throw new ForbiddenException();

    const match = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!match) throw new ForbiddenException();

    const tokens = await this.generateTokens(
      (user._id as any).toString(),
      user.email,
    );
    await this.users.setRefreshToken(
      (user._id as any).toString(),
      tokens.refreshToken,
    );
    return tokens;
  }

  async logout(userId: string) {
    await this.users.clearRefreshToken(userId);
    return { message: 'Logged out' };
  }

  private async generateTokens(sub: string, email: string) {
    const payload = { sub, email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        secret: this.config.get('JWT_SECRET'),
        expiresIn: this.config.get('JWT_EXPIRES_IN'),
      }),
      this.jwt.signAsync(payload, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
        expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN'),
      }),
    ]);
    return { accessToken, refreshToken };
  }
}
