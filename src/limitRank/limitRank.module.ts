import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LimitRankService } from './limitRank.service';
import { LimitRankController } from './limitRank.controller';
import { limitRankEntity } from './entities/limitRank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([limitRankEntity])],
  controllers: [LimitRankController],
  providers: [LimitRankService],
})
export class LimitRankModule {}
