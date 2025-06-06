import { IsEnum } from 'class-validator';

export enum Status {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class UpdateSolicitationStatusDto {
  @IsEnum(Status)
  status: Status;
}
