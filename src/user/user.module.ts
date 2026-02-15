import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/app.service';
import { UserController } from 'src/app.controller';
import { Logger } from '../common/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, Logger],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
