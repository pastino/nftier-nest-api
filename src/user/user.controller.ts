import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  Query,
  Patch,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from '@src/commons/decorator/get-user.decorator';
import { JwtAuthenticationGuard } from '@src/commons/guard/jwt-authentication.guard';
import { BaseResponse } from '@src/commons/response/base.response';
import { GetUserDto } from './dto/getUser.dto';
import { UserUpdateDataDto } from './dto/userUpdateData.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@UseGuards(JwtAuthenticationGuard)
@ApiBearerAuth()
@ApiTags('NFTier 유저')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: '유저 데이터 정보' })
  @Get()
  async getUserData(
    @GetUser() user: UserEntity,
    @Query() getUserDto: GetUserDto,
  ): Promise<
    BaseResponse<{
      walletAddress: string;
      username: string;
      profileImageUrl: string;
    }>
  > {
    return await this.userService.getUserData(user, getUserDto);
  }

  @ApiOperation({ summary: '유저 데이터 업데이트' })
  @Patch()
  async userUpdateData(
    @GetUser() user: UserEntity,
    @Body() userUpdateDataDto: UserUpdateDataDto,
  ): Promise<BaseResponse<boolean>> {
    return await this.userService.userUpdateData(user, userUpdateDataDto);
  }
}
