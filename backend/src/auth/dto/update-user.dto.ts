import { IsIn } from 'class-validator';

export class UpdateUserDto {
  @IsIn(['user', 'admin'])
  role: string;
}
