import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsIn,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  cpf: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  @IsIn(['user', 'admin'])
  role?: string;
}
