/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { SolicitationService } from './solicitation.service';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { CreateSolicitationDto } from './dto/create-solicitation.dto';
import { UpdateSolicitationStatusDto } from './dto/update-solicitation.dto';
import { ForbiddenException } from '@nestjs/common';

@Controller('solicitation')
export class SolicitationController {
  constructor(private readonly soclicitationService: SolicitationService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() dto: CreateSolicitationDto, @Req() req) {
    const userId = req.user.userId;
    return this.soclicitationService.create(dto, userId);
  }
  
  @UseGuards(JwtGuard)
  @Patch('status/:id')
  async updateStatus(@Param('id') id: number, @Body() dto: UpdateSolicitationStatusDto, @Req() req) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Apenas administradores podem alterar o status.');
    }
    return this.soclicitationService.updateStatus(Number(id), dto);
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAllAdmin(@Req() req) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Apenas administradores podem visualizar todas as solicitações.');
    }
    return this.soclicitationService.findAll();
  }
}
