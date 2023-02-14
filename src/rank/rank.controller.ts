import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from '@src/commons/decorator/get-user.decorator';
import { PageOptionsDto } from '@src/commons/dto/page.option.dto';
import { JwtAuthenticationGuard } from '@src/commons/guard/jwt-authentication.guard';
import { BaseResponse } from '@src/commons/response/base.response';
import { UserEntity } from '@src/user/entities/user.entity';
import { CreateRankDto } from './dto/createRankDto.dto';
import { GetRankDto } from './dto/getRankDto.dto';
import { RankService } from './rank.service';

@ApiBearerAuth()
@ApiTags('Rank api')
@Controller('rank')
@UseInterceptors(ClassSerializerInterceptor)
export class RankController {
  constructor(private rankService: RankService) {}

  @ApiOperation({ summary: '랭크 리스트' })
  @Get()
  async getRank(
    @GetUser() user: UserEntity,
    @Query() getRankDto: GetRankDto,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<any> {
    return await this.rankService.getRank(user, getRankDto, pageOptionsDto);
  }

  @ApiOperation({ summary: '랭크 생성(자동 생성 api)' })
  @Post()
  async createRank(
    @Body() createRankDto: CreateRankDto,
  ): Promise<BaseResponse<boolean>> {
    return await this.rankService.createRank(createRankDto);
  }

  @ApiOperation({ summary: '기존 랭크 삭제(자동 api)' })
  @Delete()
  async deleteBeforeRank(): Promise<BaseResponse<boolean>> {
    return await this.rankService.deleteBeforeRank();
  }

  @ApiOperation({ summary: '랭크 리스트 갯수' })
  @Get('/count')
  async getRankCount(@GetUser() user: UserEntity): Promise<any> {
    return await this.rankService.getRankCount(user);
  }
}
