import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WatchWalletsController } from './watchWallets.controller';
import { WatchWalletsService } from './watchWallets.service';
import { WatchWalletsEntity } from './entities/watchWallets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WatchWalletsEntity])],
  controllers: [WatchWalletsController],
  providers: [WatchWalletsService],
})
export class WatchWalletModule {}
