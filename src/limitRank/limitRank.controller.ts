import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from '@src/commons/response/base.response';
import { LimitRankService } from './limitRank.service';

@ApiTags('LimitRank api')
@Controller('limitRank')
@UseInterceptors(ClassSerializerInterceptor)
export class LimitRankController {
  constructor(private limitRankService: LimitRankService) {}

  @ApiOperation({ summary: '무료 이용자 제한 랭크' })
  @Get()
  async getLimitRankData(): Promise<BaseResponse<boolean>> {
    return await this.limitRankService.getLimitRankData();
  }
}
