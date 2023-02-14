import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from '@src/commons/response/base.response';
import { CreateAlarmDto } from './dto/createAlarm.dto';
import { AlarmService } from './alarm.service';
import { UserEntity } from '@src/user/entities/user.entity';
import { GetUser } from '@src/commons/decorator/get-user.decorator';
import { AlarmEntity } from './entities/alarm.entity';
import { PageOptionsDto } from '@src/commons/dto/page.option.dto';
import { JwtAuthenticationGuard } from '@src/commons/guard/jwt-authentication.guard';
import { GetAlarmListDto } from './dto/getAlarmList.dto';
import { SendAlarmDto } from './dto/sendAlarm.dto';
@UseGuards(JwtAuthenticationGuard)
@ApiBearerAuth()
@ApiTags('Alarm api')
@Controller('alarm')
@UseInterceptors(ClassSerializerInterceptor)
export class AlarmController {
  constructor(private alarmService: AlarmService) {}

  @ApiOperation({ summary: '알람 생성(자동 생성 api)' })
  @Post()
  async createAlarm(
    @Body() createAlarmDto: CreateAlarmDto,
  ): Promise<BaseResponse<boolean>> {
    return await this.alarmService.createAlarm(createAlarmDto);
  }

  @ApiOperation({ summary: '알람 리스트' })
  @Get()
  async getAlarmList(
    @GetUser() user: UserEntity,
    @Query() getAlarmListDto: GetAlarmListDto,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<BaseResponse<AlarmEntity[]>> {
    return await this.alarmService.getAlarmList(
      user,
      getAlarmListDto,
      pageOptionsDto,
    );
  }

  @ApiOperation({ summary: '알람 보내기(테스트 용도)' })
  @Post('/notification')
  async sendAlarm(
    @Body() sendAlarmDto: SendAlarmDto,
  ): Promise<BaseResponse<any>> {
    return await this.alarmService.sendAlarm(sendAlarmDto);
  }
}
