import { Body, Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { GetUser } from '@src/commons/decorator/get-user.decorator';
import { GetUserDto } from './dto/getUser.dto';
import axios from 'axios';
import { BaseResponse } from '@src/commons/response/base.response';
import { UserUpdateDataDto } from './dto/userUpdateData.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async getAccessToken(id: number): Promise<string> {
    const accessToken = await this.jwtService.sign(
      { id },
      {
        secret: process.env.JWT_SECRET,
      },
    );
    return accessToken;
  }

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
    const { walletAddress } = getUserDto;

    const res: any = await axios.get(
      `https://api.opensea.io/user/${walletAddress}`,
    );

    const username = res?.data?.username || 'Unnamed';
    const profileImageUrl = res?.data?.account?.profile_img_url || '';

    const isExisting = await this.userRepository.findOne({
      where: { walletAddress },
    });

    let userData;

    if (isExisting) {
      await this.userRepository.update(
        { walletAddress },
        {
          walletAddress,
          level: 'bronze',
          nickname: username,
          profileImageUrl,
        },
      );
      userData = isExisting;
    } else {
      userData = await this.userRepository.save({
        walletAddress,
        level: 'c',
        nickname: username,
        profileImageUrl,
      });
    }
    const token = await this.getAccessToken(userData.id);

    return new BaseResponse<{
      walletAddress: string;
      username: string;
      profileImageUrl: string;
      token: string;
    }>(true, '', {
      walletAddress,
      username,
      profileImageUrl,
      token,
      ...userData,
    });
  }

  async userUpdateData(
    @GetUser() user: UserEntity,
    @Body() userUpdateDataDto: UserUpdateDataDto,
  ): Promise<BaseResponse<boolean>> {
    const { id: userId } = user;
    try {
      await this.userRepository.update(
        { id: userId },
        { ...userUpdateDataDto },
      );
      return new BaseResponse<boolean>(true, '', true);
    } catch (e) {
      console.log(e);
      return new BaseResponse<boolean>(
        true,
        '유저 업데이트에 실패하였습니다.',
        false,
      );
    }
  }
}
