/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  async createUser(dto: CreateUserDto) {
    // Here you would typically hash the password and save the user to the database
    // For demonstration purposes, we'll just return the DTO
    return {
      message: 'User created successfully',
      user: dto,
    };
  }
}
