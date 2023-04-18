import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { IService } from '@ticketforge/api-gateway/data-access';
import { UserRole } from '@ticketforge/shared/api-interfaces';
import { JwtAuthService } from '../services/jwt-auth.service';
import { ServiceFactory } from '../services/service.factory';
import { Reflector } from '@nestjs/core';
import { OWNED_TYPE_KEY, OwnedType } from '../decorators/owned-type.decorator';

@Injectable()
export class OwnerShipGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtAuthService,
    private readonly serviceFactory: ServiceFactory,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    const jwtUserSession = await this.jwtService.loadToken(authHeader);
    request.user = jwtUserSession;
    const userRole = request.user?.role;

    if (
      userRole &&
      this.hasRole(userRole, [UserRole.ADMIN, UserRole.OPERATOR])
    ) {
      return true;
    }
    //if user owns the entity
    const paramId = request.params.id;

    const service: IService<any> =
      this.serviceFactory.getCorrectService(context);

    let ownedType = this.reflector.get<OwnedType>(
      OWNED_TYPE_KEY,
      context.getHandler()
    );

    if (ownedType === undefined) {
      ownedType = OwnedType.ENTITY;
    }

    if (ownedType === OwnedType.ENTITY) {
      if (!service.hasOwnership) {
        Logger.error(
          'Ownership guard is used on a service that does not implement the hasOwnership method'
        );
        throw new UnauthorizedException(
          'You are not allowed to access this resource'
        );
      }

      const hasOwnership = await service.hasOwnership(
        paramId,
        request.user.sub
      );

      if (!hasOwnership) {
        throw new UnauthorizedException(
          'You are not allowed to access this resource'
        );
      }
    } else if (ownedType === OwnedType.USER) {
      if (paramId !== request.user.sub) {
        throw new UnauthorizedException(
          'You are not allowed to access this resource'
        );
      }
    }

    return true;
  }

  hasRole(userRole: UserRole, roles: UserRole[]) {
    return userRole && roles.includes(userRole);
  }
}
