import { Injectable, Query } from '@nestjs/common';
import { GetUser } from '@src/commons/decorator/get-user.decorator';
import { UserEntity } from '@src/user/entities/user.entity';
import { BaseResponse } from '@src/commons/response/base.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RanksEntity } from './entities/ranks.entity';
import { WatchWalletsEntity } from '../watchWallets/entities/watchWallets.entity';
import { GetRankDetailDto } from './dto/getRankDto.dto';

@Injectable()
export class RanksService {
  constructor(
    @InjectRepository(RanksEntity)
    private readonly ranksRepository: Repository<RanksEntity>,
    @InjectRepository(WatchWalletsEntity)
    private readonly watchWalletsRepository: Repository<WatchWalletsEntity>,
  ) {}

  async getRankDetail(
    @GetUser() user: UserEntity,
    @Query() getRankDetailDto: GetRankDetailDto,
  ): Promise<any> {
    try {
      const { accountAddress, rankType, timeType } = getRankDetailDto;

      // let rankData;
      // let metaData;
      let useCreatedAt;
      let useTimeType;

      switch (timeType) {
        case '1d':
          useCreatedAt = new Date(
            new Date().getTime() - 60 * 60 * 24 * 2 * 1000,
          );
          useTimeType = '24h';
          break;
        case '3d':
          useCreatedAt = new Date(
            new Date().getTime() - 60 * 60 * 24 * 3 * 1000,
          );
          useTimeType = '24h';
        case '7d':
          useCreatedAt = new Date(
            new Date().getTime() - 60 * 60 * 24 * 7 * 1000,
          );
          useTimeType = '1w';
        case '14d':
          useCreatedAt = new Date(
            new Date().getTime() - 60 * 60 * 24 * 14 * 1000,
          );
          useTimeType = '2w';

        case '1m':
          useCreatedAt = new Date(
            new Date().getTime() - 60 * 60 * 24 * 30 * 1000,
          );
          useTimeType = '1m';

        case '3m':
          useCreatedAt = new Date(
            new Date().getTime() - 60 * 60 * 24 * 90 * 1000,
          );
          useTimeType = '3m';

        default:
          useCreatedAt = new Date(
            new Date().getTime() - 60 * 60 * 24 * 90 * 1000,
          );
          useTimeType = '3m';
      }

      const rankData = await this.ranksRepository
        .createQueryBuilder('ranks')
        .where(
          'ranks.accountAddress = :accountAddress and ranks.rankType = :rankType and ranks.timeType = :timeType and ranks.createdAt > :createdAt',
          {
            accountAddress,
            rankType,
            timeType: '24h',
            createdAt: useCreatedAt,
          },
        )
        .select([
          'ranks.id',
          'SUBSTRING(ranks.createdAt, 1, 10) AS stringDate',
          'ranks.rankType',
          'ranks.timeType',
          'ranks.increaseRank',
          'ranks.rank',
          'ranks.createdAt',
          'ranks.standardTime',
          'ranks.accountAddress',
          'ranks.incomeInSold',
          'ranks.incomeInSelling',
          'ranks.income',
          'ranks.investmentValue',
          'ranks.profit',
          'ranks.boughtTradeCount',
          'ranks.soldTradeCount',
          'ranks.totalTradeCount',
          'ranks.nftTotalValue',
          'ranks.walletBalance',
          'ranks.totalAssetValue',
          'ranks.username',
          'ranks.profileImage',
          'ranks.allRank',
          'ranks.allIncomeInSold',
          'ranks.allIncomeInSelling',
          'ranks.allIncome',
          'ranks.allInvestmentValue',
          'ranks.allProfit',
          'ranks.allBoughtTradeCount',
          'ranks.allSoldTradeCount',
          'ranks.allTotalTradeCount',
          'ranks.allNftTotalValue',
          'ranks.allWalletBalance',
          'ranks.allTotalAssetValue',
        ])
        .groupBy('stringDate')
        .getRawMany();

      const metaData = await this.ranksRepository.findOne({
        where: {
          rankType: 'income',
          timeType: useTimeType,
          accountAddress,
        },
        order: {
          createdAt: 'DESC',
        },
      });

      const currentRanking = metaData.rank;
      const totalAssetValue = metaData.totalAssetValue;
      const lastRanking = rankData?.length
        ? rankData?.[rankData?.length - 1].rank
        : 0;
      const username = rankData?.[0]?.username;
      const profileImage = rankData?.[0]?.profileImage;
      const walletCount = await this.watchWalletsRepository.count();

      const profit = metaData.profit;

      const highestRanking = rankData.sort((a, b) => a.rank - b.rank)?.[0]
        ?.rank;
      const lowestRanking = rankData.sort((a, b) => b.rank - a.rank)?.[0]?.rank;

      return {
        currentRanking,
        lastRanking,
        username,
        profileImage,
        totalAssetValue: totalAssetValue,
        profit,
        highestRanking,
        lowestRanking,
        graphData: rankData.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        ),
        walletCount,
      };
    } catch (err: any) {
      console.log(err.message);
      return new BaseResponse<null>(
        false,
        'activity api 전송에 실패하였습니다.',
        null,
      );
    }
  }
}
