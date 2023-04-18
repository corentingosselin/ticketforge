import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@ticketforge/shared/api-interfaces';
import { JwtAuthService } from '../services/jwt-auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly jwtService: JwtAuthService, private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    const jwtUserSession = await this.jwtService.loadToken(authHeader);
    request.user = jwtUserSession;

    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const userRole = request.user?.role;

    if (!userRole || !roles.includes(userRole)) {
      throw new UnauthorizedException('Insufficient role');
    }

    return true;
  }
}