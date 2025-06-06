/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSolicitationDto } from './dto/create-solicitation.dto';
import { UpdateSolicitationStatusDto } from './dto/update-solicitation.dto';

@Injectable()
export class SolicitationService {
  constructor(private readonly prismaService: PrismaService) { }

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

  async updateStatus(id: number, dto: UpdateSolicitationStatusDto) {
    const solicitacao = await this.prismaService.solicitacao.findUnique({ where: { id } });
    if (!solicitacao) throw new NotFoundException('Solicitação não encontrada');
    return this.prismaService.solicitacao.update({
      where: { id },
      data: { status: dto.status },
    });
  }

  async findAll(tipo?: string) {
    return this.prismaService.solicitacao.findMany({
      where: tipo ? { tipoSolicitacao: tipo as any } : {},
      include: {
        solicitante: {
          select: { id: true },
        },
      }
    });
  }

  async findAllUser(userId: number) {
    return this.prismaService.solicitacao.findMany({
      where: { solicitanteId: userId },
      include: {
        solicitante: {
          select: { id: true },
        },
      }
    });
  }

  async delete(id: number) {
    const solicitacao = await this.prismaService.solicitacao.findUnique({ where: { id } });
    if (!solicitacao) throw new NotFoundException('Solicitação não encontrada');
    return this.prismaService.solicitacao.delete({ where: { id } });
  }
}
