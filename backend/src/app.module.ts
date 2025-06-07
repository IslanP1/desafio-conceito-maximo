import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { SolicitationService } from './solicitation/solicitation.service';
import { SolicitationController } from './solicitation/solicitation.controller';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [AppController, SolicitationController],
  providers: [AppService, SolicitationService],
})
export class AppModule {}
