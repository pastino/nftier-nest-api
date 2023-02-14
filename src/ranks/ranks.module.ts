import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RanksController } from './ranks.controller';
import { RanksEntity } from './entities/ranks.entity';
import { RanksService } from './ranks.service';
import { WatchWalletsEntity } from '@src/watchWallets/entities/watchWallets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RanksEntity, WatchWalletsEntity])],
  controllers: [RanksController],
  providers: [RanksService],
})
export class RanksModule {}
