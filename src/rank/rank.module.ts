import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankService } from './rank.service';
import { RankController } from './rank.controller';
import { RankEntity } from './entities/rank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RankEntity])],
  controllers: [RankController],
  providers: [RankService],
})
export class RankModule {}
