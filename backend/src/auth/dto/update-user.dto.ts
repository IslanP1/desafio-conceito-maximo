import { IsIn } from 'class-validator';

export class UpdateUserDto {
  @IsIn(['USER', 'ADMIN'])
  role: string;
}
