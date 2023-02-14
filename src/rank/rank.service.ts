import { Body, Injectable, Query } from '@nestjs/common';
import { GetUser } from '@src/commons/decorator/get-user.decorator';
import { UserEntity } from '@src/user/entities/user.entity';
import { BaseResponse } from '@src/commons/response/base.response';
import { GetRankDto, RankType, TimeType } from './dto/getRankDto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RankEntity } from './entities/rank.entity';
import { Between, Repository } from 'typeorm';
import { PageOptionsDto } from '@src/commons/dto/page.option.dto';
import { CreateRankDto } from './dto/createRankDto.dto';

@Injectable()
export class RankService {
  constructor(
    @InjectRepository(RankEntity)
    private readonly rankRepository: Repository<RankEntity>,
  ) {}

  async getRank(
    @GetUser() user: UserEntity,
    @Query() getRankDto: GetRankDto,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<BaseResponse<any>> {
    const { rankType, timeType, range } = getRankDto;
    const { page, take } = pageOptionsDto;

    try {
      const standardTimeList = await this.rankRepository
        .createQueryBuilder('rank')
        .select('DISTINCT rank.standardTime', 'standardTime')
        // .orderBy('rank.standardTime', 'DESC')
        .getRawMany();

      const standardTimeListBySort = standardTimeList;
      const { standardTime } = standardTimeListBySort[0];

      const rankCount = await this.rankRepository.count({
        where: {
          standardTime,
          rankType: RankType['income'],
          timeType: TimeType['all'],
        },
      });

      if (range && range.length === 2) {
        const startPoint = Number(range?.[0]);
        const endPoint = Number(range?.[1]);
        const rankList = await this.rankRepository.find({
          where: {
            rankType,
            timeType,
            standardTime,
            rank: Between(startPoint, endPoint),
          },
          order: { rank: 'ASC' },
        });

        return new BaseResponse<any>(true, '', {
          totalPage: Math.ceil(rankCount / 50),
          currentPage: page,
          rankCount,
          result: rankList,
        });
      }

      const rankList = await this.rankRepository.find({
        where: { rankType, timeType, standardTime },
        order: { rank: 'ASC' },
        take: take || 50,
        skip: take * (page - 1) || 0,
      });

      return new BaseResponse<any>(true, '', {
        totalPage: Math.ceil(rankCount / 50),
        currentPage: page,
        rankCount,
        result: rankList,
      });
    } catch (err: any) {
      console.log(err.message);
      return new BaseResponse<null>(
        false,
        'activity api 전송에 실패하였습니다.',
        null,
      );
    }
  }

  async deleteBeforeRank() {
    try {
      const standardTimeList = await this.rankRepository
        .createQueryBuilder('rank')
        .select('DISTINCT rank.standardTime', 'standardTime')
        // .orderBy('rank.standardTime', 'DESC')
        .getRawMany();

      const standardTimeListBySort = standardTimeList?.reverse();

      for (let i in standardTimeListBySort) {
        if (Number(i) === 0) {
          continue;
        }
        const { standardTime } = standardTimeListBySort[i];

        await this.rankRepository.delete({ standardTime });
      }
    } catch (err) {
      console.log(err.message);
      return new BaseResponse<null>(
        false,
        'activity api 전송에 실패하였습니다.',
        null,
      );
    }

    return new BaseResponse<boolean>(true, '', true);
  }

  async createRank(
    @Body() createRankDto: CreateRankDto,
  ): Promise<BaseResponse<boolean>> {
    try {
      const { rankList } = createRankDto;
      for (let i in rankList) {
        const rank = rankList[i];
        console.log(rank.rankType);

        await this.rankRepository.save(rank);
      }
      return new BaseResponse<boolean>(true, '', true);
    } catch (err: any) {
      console.log(err.message);
      return new BaseResponse<null>(
        false,
        'activity api 전송에 실패하였습니다.',
        null,
      );
    }
  }

  async getRankCount(
    @GetUser() user: UserEntity,
  ): Promise<BaseResponse<number>> {
    try {
      const standardTimeList = await this.rankRepository
        .createQueryBuilder('rank')
        .select('DISTINCT rank.standardTime', 'standardTime')
        // .orderBy('rank.standardTime', 'DESC')
        .getRawMany();

      const standardTimeListBySort = standardTimeList;
      const { standardTime } = standardTimeListBySort[0];

      const rankCount = await this.rankRepository.count({
        where: {
          standardTime,
          rankType: RankType['income'],
          timeType: TimeType['all'],
        },
      });

      return new BaseResponse<number>(true, '', rankCount);
    } catch (err: any) {
      console.log(err.message);
      return new BaseResponse<null>(false, 'api 전송에 실패하였습니다.', null);
    }
  }
}
