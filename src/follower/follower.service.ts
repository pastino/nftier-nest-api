import { Body, Injectable, Query, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FollowerEntity } from './entities/follower.entity';
import { JwtService } from '@nestjs/jwt';
import { GetUser } from '@src/commons/decorator/get-user.decorator';
import { UserEntity } from '@src/user/entities/user.entity';
import { UpdateFollwerDto } from './dto/updateFollower.dto';
import { RankEntity } from '@src/rank/entities/rank.entity';
import { BaseResponse } from '@src/commons/response/base.response';
import { PageOptionsDto } from '@src/commons/dto/page.option.dto';
import { RankType, TimeType } from '@src/rank/dto/getRankDto.dto';
import { Filter, GetFollowerListDto } from './dto/getFollowerList.dto';
import { GetHasFollowerDto } from './dto/getHasFollower.dto';

@Injectable()
export class FollowerService {
  constructor(
    @InjectRepository(FollowerEntity)
    private readonly followerRepository: Repository<FollowerEntity>,
    @InjectRepository(RankEntity)
    private readonly rankRepository: Repository<RankEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async getHasFollwer(
    @GetUser() user: UserEntity,
    @Query() getHasFollowerDto: GetHasFollowerDto,
  ): Promise<BaseResponse<boolean>> {
    const { targetAddress } = getHasFollowerDto;

    if (!user?.id) {
      return new BaseResponse<boolean>(false, '로그인이 필요합니다.', false);
    }

    try {
      const existingFollwer = await this.followerRepository.findOne({
        where: { userId: user?.id, walletAddress: targetAddress },
      });

      if (existingFollwer) {
        return new BaseResponse<boolean>(true, '', true);
      }

      return new BaseResponse<boolean>(true, '', false);
    } catch (e) {
      console.log(e);
      return new BaseResponse<boolean>(
        false,
        'api 전송에 실패하였습니다.',
        false,
      );
    }
  }

  async getFollwerCount(
    @GetUser() user: UserEntity,
  ): Promise<BaseResponse<any>> {
    try {
      const standardTimeList = await this.rankRepository
        .createQueryBuilder('rank')
        .select('DISTINCT rank.standardTime', 'standardTime')
        // .orderBy('rank.standardTime', 'DESC')
        .getRawMany();

      const { standardTime: latestRankStandardTime } = standardTimeList?.[0];

      const totalCount = await this.rankRepository.count({
        where: {
          standardTime: latestRankStandardTime,
          timeType: TimeType['all'],
          rankType: RankType['income'],
        },
      });

      if (!user?.id) {
        return new BaseResponse<{
          totalCount: number;
          followerCount: number;
        }>(true, '', {
          totalCount,
          followerCount: 0,
        });
      }

      const followerCount = await this.followerRepository.count({
        where: { userId: user?.id },
      });

      return new BaseResponse<{
        totalCount: number;
        followerCount: number;
      }>(true, '', {
        totalCount,
        followerCount,
      });
    } catch (e) {
      console.log(e);
      return new BaseResponse<boolean>(
        false,
        'api 전송에 실패하였습니다.',
        false,
      );
    }
  }
  async getFollwerList(
    @GetUser() user: UserEntity,
    @Query() pageOptionsDto: PageOptionsDto,
    @Query(ValidationPipe) getFollowerListDto: GetFollowerListDto,
  ): Promise<BaseResponse<{ totalPage: number; data: RankEntity[] }>> {
    const { page, take } = pageOptionsDto;
    const { filter } = getFollowerListDto;
    try {
      const standardTimeList = await this.rankRepository
        .createQueryBuilder('rank')
        .select('DISTINCT rank.standardTime', 'standardTime')
        // .orderBy('rank.standardTime', 'DESC')
        .getRawMany();

      const { standardTime: latestRankStandardTime } = standardTimeList?.[0];

      let order: any = {
        rank: 'ASC',
      };

      switch (filter.toLowerCase()) {
        case Filter['RANK']:
          break;
        case Filter['NEWEST']:
          order = {
            walletCreatedAt: 'DESC',
          };
          break;
        case Filter['OLDEST']:
          order = {
            walletCreatedAt: 'ASC',
          };
          break;
        default:
          break;
      }

      const rankList = await this.rankRepository.find({
        where: {
          standardTime: latestRankStandardTime,
          timeType: TimeType['all'],
          rankType: RankType['income'],
        },
        take: take || 50,
        skip: take * (page - 1) || 0,
        order,
      });

      const dailyRankList = await this.rankRepository.find({
        where: {
          standardTime: latestRankStandardTime,
          timeType: TimeType['24h'],
          rankType: RankType['income'],
        },
        order: {
          rank: 'ASC',
        },
      });

      const totalCount = await this.rankRepository.count({
        where: {
          standardTime: latestRankStandardTime,
          timeType: TimeType['all'],
          rankType: RankType['income'],
        },
      });

      const totalPage = Math.ceil(totalCount / take);

      if (!user?.id) {
        return new BaseResponse<{
          totalPage: number;
          data: any[];
          currentPage: number;
        }>(true, '', {
          totalPage,
          currentPage: page,
          data: rankList.map((item) => {
            return {
              rank: item.rank,
              profileImageUrl: item.profileImage,
              username: item.username,
              increaseRank: item.increaseRank,
              accountAddress: item.accountAddress,
              itemCount: item.itemCount,
              assets: item.allTotalAssetValue,
              dailyProfit: dailyRankList.find(
                (rank) => rank.accountAddress === item.accountAddress,
              )?.profit,
              isFollow: false,
            };
          }),
        });
      } else {
        const follwerList = await this.followerRepository.find({
          where: {
            userId: user.id,
          },
        });

        return new BaseResponse<{
          totalPage: number;
          currentPage: number;
          data: any[];
        }>(true, '', {
          currentPage: page,
          totalPage,
          data: rankList.map((item) => {
            return {
              rank: item.rank,
              profileImageUrl: item.profileImage,
              username: item.username,
              increaseRank: item.increaseRank,
              accountAddress: item.accountAddress,
              itemCount: item.itemCount,
              assets: item.allTotalAssetValue,
              dailyProfit: dailyRankList.find(
                (rank) => rank.accountAddress === item.accountAddress,
              )?.profit,
              isFollow: follwerList
                .map((item) => item.walletAddress)
                .includes(item.accountAddress),
            };
          }),
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async createFollwer(
    @GetUser() user: UserEntity,
    @Body() updateFollower: UpdateFollwerDto,
  ): Promise<BaseResponse<boolean>> {
    const { isFollow, walletAddress } = updateFollower;

    if (!user?.id) {
      return new BaseResponse<boolean>(false, '로그인이 필요합니다.', false);
    }
    try {
      const existingFollwer = await this.followerRepository.findOne({
        where: { userId: user?.id, walletAddress },
      });

      if (!isFollow && existingFollwer) {
        await this.followerRepository.delete({ id: existingFollwer.id });
      } else {
        await this.followerRepository.save({
          userId: user?.id,
          walletAddress,
        });
      }
      return new BaseResponse<boolean>(true, '', true);
    } catch (e) {
      console.log(e);
      return new BaseResponse<boolean>(
        false,
        '팔로우 api 전송에 실패하였습니다.',
        false,
      );
    }
  }
}
