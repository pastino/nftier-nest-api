import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmHistoryService } from './alarmHistory.service';
import { AlarmHistoryController } from './alarmHistory.controller';
import { AlarmHistoryEntity } from './entities/alarmHistory.entity';
import { FollowerEntity } from '@src/follower/entities/follower.entity';
import { AlarmEntity } from '@src/alarm/entities/alarm.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlarmHistoryEntity, AlarmEntity, FollowerEntity]),
  ],
  controllers: [AlarmHistoryController],
  providers: [AlarmHistoryService],
})
export class AlarmHistoryModule {}
