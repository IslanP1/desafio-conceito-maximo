import { IsNotEmpty, IsEnum } from 'class-validator';

export enum TipoSolicitacao {
  TROCA_LAMPADA = 'TROCA_LAMPADA',
  TAPA_BURACO = 'TAPA_BURACO',
}

export class CreateSolicitationDto {
  @IsEnum(TipoSolicitacao)
  tipoSolicitacao: TipoSolicitacao;

  @IsNotEmpty()
  endereco: string;

  @IsNotEmpty()
  descricao: string;
}
