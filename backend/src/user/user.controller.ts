import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: AuthDto) {
    if (!body.email || !body.password)
      throw new BadRequestException('Email and password are required');

    return this.userService.register(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: AuthDto) {
    if (!body.email || !body.password)
      throw new BadRequestException('Email and password are required');

    return this.userService.login(body.email, body.password);
  }
}
