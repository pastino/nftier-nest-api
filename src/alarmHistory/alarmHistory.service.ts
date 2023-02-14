import { Injectable } from '@nestjs/common';
import { BaseResponse } from '@src/commons/response/base.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlarmHistoryEntity } from './entities/alarmHistory.entity';
import { GetUser } from '@src/commons/decorator/get-user.decorator';
import { UserEntity } from '@src/user/entities/user.entity';

@Injectable()
export class AlarmHistoryService {
  constructor(
    @InjectRepository(AlarmHistoryEntity)
    private readonly alarmHistoryRepository: Repository<AlarmHistoryEntity>,
  ) {}

  async checkAlarm(
    @GetUser() user: UserEntity,
  ): Promise<BaseResponse<boolean>> {
    try {
      if (!user)
        return new BaseResponse<null>(false, '로그인이 필요합니다.', null);

      const { id } = user;

      await this.alarmHistoryRepository.update(
        { userId: id },
        {
          isChecked: true,
        },
      );

      return new BaseResponse<boolean>(true, '', true);
    } catch (err: any) {
      console.log(err.message);
      return new BaseResponse<null>(false, '알람 체크에 실패하였습니다.', null);
    }
  }
}
