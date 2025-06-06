/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { SolicitationService } from './solicitation.service';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { CreateSolicitationDto } from './dto/create-solicitation.dto';
import { UpdateSolicitationStatusDto } from './dto/update-solicitation.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('solicitation')
export class SolicitationController {
  constructor(private readonly soclicitationService: SolicitationService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() dto: CreateSolicitationDto, @Req() req) {
    const userId = req.user.userId;
    return this.soclicitationService.create(dto, userId);
  }
  
  @UseGuards(JwtGuard, AuthGuard)
  @Patch(':id/status')
  async updateStatus(@Param('id') id: number, @Body() dto: UpdateSolicitationStatusDto) {
    return this.soclicitationService.updateStatus(Number(id), dto);
  }
}
