import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from '@src/commons/decorator/get-user.decorator';
import { UserEntity } from '@src/user/entities/user.entity';
import { GetRankDetailDto } from './dto/getRankDto.dto';
import { RanksService } from './ranks.service';

@ApiBearerAuth()
@ApiTags('Ranks api')
@Controller('ranks')
@UseInterceptors(ClassSerializerInterceptor)
export class RanksController {
  constructor(private ranksService: RanksService) {}

  @ApiOperation({ summary: '랭크 리스트' })
  @Get()
  async getRankDetail(
    @GetUser() user: UserEntity,
    @Query() getRankDetailDto: GetRankDetailDto,
  ): Promise<any> {
    return await this.ranksService.getRankDetail(user, getRankDetailDto);
  }
}
