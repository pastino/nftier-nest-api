import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmService } from './alarm.service';
import { AlarmController } from './alarm.controller';
import { AlarmEntity } from './entities/alarm.entity';
import { FollowerEntity } from '@src/follower/entities/follower.entity';
import { AlarmHistoryEntity } from '@src/alarmHistory/entities/alarmHistory.entity';
import { RankEntity } from '@src/rank/entities/rank.entity';
import { UserEntity } from '@src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AlarmEntity,
      AlarmHistoryEntity,
      FollowerEntity,
      RankEntity,
      UserEntity,
    ]),
  ],
  controllers: [AlarmController],
  providers: [AlarmService],
})
export class AlarmModule {}
