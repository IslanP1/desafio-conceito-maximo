import { IsEnum } from 'class-validator';

export enum Status {
  PENDING = 'PENDING',
  GOING = 'GOING',
  COMPLETED = 'COMPLETED',
}

export class UpdateSolicitationStatusDto {
  @IsEnum(Status)
  status: Status;
}
