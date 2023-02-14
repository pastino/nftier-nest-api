import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '@src/commons/decorator/get-user.decorator';
import { BaseResponse } from '@src/commons/response/base.response';
import { GetUserDto } from './dto/getUser.dto';
import { AuthService } from './auth.service';

@ApiTags('NFTier 유저 인증')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  async getUserData(@Query() getUserDto: GetUserDto): Promise<
    BaseResponse<{
      walletAddress: string;
      username: string;
      profileImageUrl: string;
    }>
  > {
    return await this.authService.getUserData(getUserDto);
  }
}
