import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpneSeaService } from './opensea.service';
import { OpenSeaController } from './opensea.controller';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [OpenSeaController],
  providers: [OpneSeaService],
})
export class OpenSeaModule {}
