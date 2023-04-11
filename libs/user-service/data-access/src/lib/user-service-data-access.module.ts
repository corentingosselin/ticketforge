import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Module({
  controllers: [],
  providers: [UserService],
  exports: [UserService],
  imports: [
    MikroOrmModule.forFeature([UserEntity])

  ],
})
export class UserServiceDataAccessModule {}
