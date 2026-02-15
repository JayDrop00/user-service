import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Logger } from './common/logger.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly logger: Logger,
  ) {}

  // Create a new user using DTO
  async createUser(dto: RegisterDto): Promise<User> {
    const { username, password } = dto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      username,
      password: hashedPassword,
    });

    await this.userRepo.save(user);
    this.logger.log(`User registered: ${username}`);
    return user;
  }

  // Validate login using DTO
  async validateUser(dto: LoginDto): Promise<{ id: number; username: string; password: string } | null> {
    const { username, password } = dto;

    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) {
      this.logger.warn(`Login failed: User not found - ${username}`);
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (valid) this.logger.log(`Login success: ${username}`);
    else this.logger.warn(`Login failed: Incorrect password - ${username}`);

    return {
      id: user.id,
      username: user.username,
      password: user.password
    };
  }
}
