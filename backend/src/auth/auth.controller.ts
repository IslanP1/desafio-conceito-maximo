import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtGuard } from './jwt/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.authService.createUser(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    return this.authService.loginUser(dto);
  }

  @Patch('role/:id')
  @UseGuards(JwtGuard, AuthGuard)
  async updateRole(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.authService.updateUserRole(Number(id), dto.role);
  }

  @Get('users')
  @UseGuards(JwtGuard, AuthGuard)
  async getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Delete('user/:id')
  @UseGuards(JwtGuard, AuthGuard)
  async deleteUser(@Param('id') id: number) {
    return this.authService.deleteUser(Number(id));
  }
}
