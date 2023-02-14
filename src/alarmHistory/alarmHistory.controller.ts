import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from '@src/commons/response/base.response';
import { UserEntity } from '@src/user/entities/user.entity';
import { GetUser } from '@src/commons/decorator/get-user.decorator';
import { JwtAuthenticationGuard } from '@src/commons/guard/jwt-authentication.guard';
import { AlarmHistoryService } from './alarmHistory.service';
@UseGuards(JwtAuthenticationGuard)
@ApiBearerAuth()
@ApiTags('Alarm History api')
@Controller('alarm-history')
@UseInterceptors(ClassSerializerInterceptor)
export class AlarmHistoryController {
  constructor(private alarmHistoryService: AlarmHistoryService) {}

  @ApiOperation({ summary: '알람 읽음 여부 업데이트' })
  @Post()
  async checkAlarm(
    @GetUser() user: UserEntity,
  ): Promise<BaseResponse<boolean>> {
    return await this.alarmHistoryService.checkAlarm(user);
  }
}
