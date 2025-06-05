import { IsEmail, IsIn } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsIn(['user', 'admin'])
  role: string;
}
