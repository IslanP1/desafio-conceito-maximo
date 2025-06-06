/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSolicitationDto } from './dto/create-solicitation.dto';

@Injectable()
export class SolicitationService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateSolicitationDto, userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    return this.prismaService.solicitacao.create({
      data: {
        tipoSolicitacao: dto.tipoSolicitacao,
        endereco: dto.endereco,
        descricao: dto.descricao,
        nomeSolicitante: user?.name ?? '',
        cpfSolicitante: user?.cpf ?? '',
        solicitante: {
          connect: { id: userId },
        },
      },
    });
  }
}
