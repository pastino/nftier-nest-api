import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { GetUser } from '@src/commons/decorator/get-user.decorator';
import { GetUserDto } from './dto/getUser.dto';
import axios from 'axios';
import { BaseResponse } from '@src/commons/response/base.response';
import { UserEntity } from '@src/user/entities/user.entity';

@Injectable()
export class AuthService {
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

  async getUserData(@Query() getUserDto: GetUserDto): Promise<
    BaseResponse<{
      walletAddress: string;
      username: string;
      profileImageUrl: string;
    }>
  > {
    const { walletAddress } = getUserDto;
    let username = 'Unnamed';
    let profileImageUrl = '';
    try {
      const res: any = await axios.get(
        `https://api.opensea.io/user/${walletAddress}`,
      );
      username = res?.data?.username || 'Unnamed';
      profileImageUrl = res?.data?.account?.profile_img_url || '';
    } catch (e) {
      console.log(e);
    }

    const isExisting = await this.userRepository.findOne({
      where: { walletAddress },
    });

    let userData;

    if (isExisting) {
      await this.userRepository.update(
        { walletAddress },
        {
          walletAddress,
          nickname: username,
          profileImageUrl,
        },
      );
      userData = isExisting;
    } else {
      userData = await this.userRepository.save({
        walletAddress,
        level: 'bronze',
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

  async getUserDetailData(user: UserEntity): Promise<any> {}
}
