import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@ticketforge/shared/api-interfaces';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
