/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        cpf: dto.cpf,
        password: hashedPassword,
        role: 'USER', // Default role is 'user'
      },
    });

    const { password, ...result } = user;
    return {
      message: 'User created successfully',
      user: result,
    };
  }

  async loginUser(dto: LoginUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.password);
    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email },
      token,
      role: user.role,
    };
  }

  async updateUserRole(id: number, role: string) {
    const userExists = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const user = await this.prismaService.user.update({
      where: { id },
      data: { role: role.toUpperCase() as any },
    });

    const { password, ...result } = user;
    return {
      message: 'User role updated successfully',
      user: result,
    };
  }

  async getAllUsers() {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        role: true,
      },
    });

    return {
      message: 'Users retrieved successfully',
      users,
    };
  }

  async deleteUser(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.prismaService.user.delete({ where: { id } });
    return { message: 'Usuário removido com sucesso' };
  }
}
