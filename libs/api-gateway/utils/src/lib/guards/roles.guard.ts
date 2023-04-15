import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@ticketforge/shared/api-interfaces';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token format');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = await this.jwtService.verify(token);
      request.user = decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const userRole = request.user?.role;
    console.log(request);

    if (!userRole || !roles.includes(userRole)) {
      throw new UnauthorizedException('Insufficient role');
    }

    return true;
  }
}