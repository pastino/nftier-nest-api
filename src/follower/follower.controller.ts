import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  Patch,
  Body,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from '@src/commons/decorator/get-user.decorator';
import { PageOptionsDto } from '@src/commons/dto/page.option.dto';
import { JwtAuthenticationGuard } from '@src/commons/guard/jwt-authentication.guard';
import { BaseResponse } from '@src/commons/response/base.response';
import { RankEntity } from '@src/rank/entities/rank.entity';
import { UserEntity } from '@src/user/entities/user.entity';
import { GetFollowerListDto } from './dto/getFollowerList.dto';
import { GetHasFollowerDto } from './dto/getHasFollower.dto';
import { UpdateFollwerDto } from './dto/updateFollower.dto';
import { FollowerService } from './follower.service';

@UseGuards(JwtAuthenticationGuard)
@ApiBearerAuth()
@ApiTags('follower')
@Controller('follower')
@UseInterceptors(ClassSerializerInterceptor)
export class FollowerController {
  constructor(private follwerService: FollowerService) {}

  @ApiOperation({ summary: '팔로잉 여부' })
  @Get('/has')
  async getHasFollwer(
    @GetUser() user: UserEntity,
    @Query() getHasFollowerDto: GetHasFollowerDto,
  ): Promise<BaseResponse<boolean>> {
    return await this.follwerService.getHasFollwer(user, getHasFollowerDto);
  }

  @ApiOperation({ summary: '팔로워 Count' })
  @Get('/count')
  async getFollwerCount(
    @GetUser() user: UserEntity,
  ): Promise<BaseResponse<boolean>> {
    return await this.follwerService.getFollwerCount(user);
  }

  @ApiOperation({ summary: '팔로워 리스트' })
  @Get()
  async getFollwerList(
    @GetUser() user: UserEntity,
    @Query() pageOptionsDto: PageOptionsDto,
    @Query(ValidationPipe) getFollowerListDto: GetFollowerListDto,
  ): Promise<BaseResponse<{ totalPage: number; data: RankEntity[] }>> {
    return await this.follwerService.getFollwerList(
      user,
      pageOptionsDto,
      getFollowerListDto,
    );
  }

  @ApiOperation({ summary: '팔로우' })
  @Patch()
  async createFollwer(
    @GetUser() user: UserEntity,
    @Body() updateFollower: UpdateFollwerDto,
  ): Promise<Promise<any>> {
    return await this.follwerService.createFollwer(user, updateFollower);
  }
}
