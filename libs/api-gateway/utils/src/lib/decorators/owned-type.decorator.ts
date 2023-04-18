import { SetMetadata } from '@nestjs/common';

export const OWNED_TYPE_KEY = 'owned_type';

export enum OwnedType {
    USER,
    ENTITY
}

export const OwnedTypeGuard = (ownedType: OwnedType) =>
  SetMetadata(OWNED_TYPE_KEY, ownedType);

export default OwnedTypeGuard;
