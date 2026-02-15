import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './app.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('register_user')
  async register(dto: RegisterDto) {
    return await this.userService.createUser(dto);
  }

  @MessagePattern('validate_user')
  async validate(dto: LoginDto) {
    const valid = await this.userService.validateUser(dto);
    return valid;
  }
    
}
