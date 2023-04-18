export interface IService<T, CreateDto = T> {
  create(entity: CreateDto): Promise<T>;
  findAll(id?: string): Promise<T[]>;
  findOne(id: number | string): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: number | string): Promise<boolean>;
  hasOwnership?(id: number | string, ownerId: number | string): Promise<boolean>;
}
