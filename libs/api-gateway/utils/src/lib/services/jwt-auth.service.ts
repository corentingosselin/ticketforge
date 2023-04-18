import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtUserSession } from '@ticketforge/shared/api-interfaces';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async loadToken(authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = (await this.jwtService.verify(token)) as JwtUserSession;
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
