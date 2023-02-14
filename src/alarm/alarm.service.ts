import { Body, Injectable, Query } from '@nestjs/common';
import { BaseResponse } from '@src/commons/response/base.response';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateAlarmDto } from './dto/createAlarm.dto';
import { AlarmEntity } from './entities/alarm.entity';
import { GetUser } from '@src/commons/decorator/get-user.decorator';
import { UserEntity } from '@src/user/entities/user.entity';
import { FollowerEntity } from '@src/follower/entities/follower.entity';
import { PageOptionsDto } from '@src/commons/dto/page.option.dto';
import { AlarmHistoryEntity } from '@src/alarmHistory/entities/alarmHistory.entity';
import { RankEntity } from '@src/rank/entities/rank.entity';
import { TimeType } from '@src/rank/dto/getRankDto.dto';
import { GetAlarmListDto } from './dto/getAlarmList.dto';
import { sendNotification } from '@src/commons/utils';
import { SendAlarmDto } from './dto/sendAlarm.dto';

@Injectable()
export class AlarmService {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>,
    @InjectRepository(AlarmHistoryEntity)
    private readonly alarmHistoryRepository: Repository<AlarmHistoryEntity>,
    @InjectRepository(FollowerEntity)
    private readonly followerRepository: Repository<FollowerEntity>,
    @InjectRepository(RankEntity)
    private readonly rankRepository: Repository<RankEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createAlarm(
    @Body() createAlarmDto: CreateAlarmDto,
  ): Promise<BaseResponse<boolean>> {
    try {
      const { alarmData } = createAlarmDto;
      const alarm = await this.alarmRepository.save({
        ...alarmData,
        isChecked: false,
      });

      const followerList = await this.followerRepository.find({
        where: {
          walletAddress: In([alarmData.makerAddress, alarmData.takerAddress]),
        },
      });

      for (let i in followerList) {
        const follower = followerList[i];
        await this.alarmHistoryRepository.save({
          alarmId: alarm.id,
          userId: follower.userId,
          isChecked: false,
        });

        const user = await this.userRepository.findOne({
          where: {
            id: follower.userId as number,
          },
        });

        if (!user.isNotiAllowed || !user?.fcmToken) continue;

        const rankData = await this.rankRepository.findOne({
          where: {
            accountAddress: alarmData.targetAddress,
            timeType: TimeType.all,
          },
        });

        const highPriority = user.highPriority;
        const lowPriority = user.lowPriority;
        const isEveryOne = user.isEveryoneAllowed;

        if (!isEveryOne && lowPriority > 0) {
          if (highPriority > rankData.rank || lowPriority < rankData.rank)
            continue;
        }

        if (!user.isSetTime) {
          sendNotification({
            token: user.fcmToken,
            title: `${rankData.username}'s NFT transaction has occurred`,
            body: alarmData.metaName,
            data: { path: 'Alarm' },
          });
          console.log(user.nickname, 'first send');
          continue;
        }

        if (!user.startAlarmReceiveTime || !user.endAlarmReceiveTime) {
          sendNotification({
            token: user.fcmToken,
            title: `${rankData.username}'s NFT transaction has occurred`,
            body: alarmData.metaName,
            data: { path: 'Alarm' },
          });
          console.log(user.nickname, 'first send');
          continue;
        }

        const localTimeOffset = user.localTimeOffset;
        const localTimeOffsetHour = localTimeOffset / 60;
        const startAlarmTime = user.startAlarmReceiveTime.split(':');
        const startAlarmHour = Number(startAlarmTime?.[0]) || 0;
        const startLocalTimeHour = startAlarmHour + localTimeOffsetHour;
        const startAlarmMinute = Number(startAlarmTime?.[1]) || 0;

        const endAlarmTime = user.endAlarmReceiveTime.split(':');
        const endAlarmHour = Number(endAlarmTime?.[0]) || 0;
        const endLocalTimeHour = endAlarmHour + localTimeOffsetHour;
        const endAlarmMinute = Number(endAlarmTime?.[1]) || 0;

        const today = new Date();

        const currentHour = today.getHours();
        const currentMinute = today.getMinutes();

        if (currentHour > endLocalTimeHour) continue;
        if (currentHour === endLocalTimeHour && currentMinute > endAlarmMinute)
          continue;

        if (currentHour < startLocalTimeHour) continue;
        if (
          currentHour === startLocalTimeHour &&
          currentMinute < startAlarmMinute
        )
          continue;

        console.log(user.nickname, 'second send');
        sendNotification({
          token: user.fcmToken,
          title: `${rankData.username}'s NFT transaction has occurred`,
          body: alarmData.metaName,
          data: { path: 'Alarm' },
        });
      }

      return new BaseResponse<boolean>(true, '', true);
    } catch (err: any) {
      console.log(err.message);
      return new BaseResponse<null>(false, '알람 생성에 실패하였습니다.', null);
    }
  }

  async getAlarmList(
    @GetUser() user: UserEntity,
    @Query() getAlarmListDto: GetAlarmListDto,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<BaseResponse<AlarmEntity[]>> {
    try {
      if (!user)
        return new BaseResponse<null>(false, '로그인이 필요합니다', null);

      const { id } = user;
      const { order } = getAlarmListDto;
      const { page, take } = pageOptionsDto;

      const lowerCaseOrder = order.toLowerCase();

      const builder = await this.alarmHistoryRepository
        .createQueryBuilder('alarmHistory')
        .where('alarmHistory.userId = :userId', {
          userId: id,
        })
        .leftJoinAndMapOne(
          'alarmHistory.alarm',
          AlarmEntity,
          'alarm',
          'alarmHistory.alarmId = alarm.id',
        );

      let alarmList = [];
      switch (lowerCaseOrder) {
        case 'newest':
          alarmList = await builder
            .orderBy('alarmHistory.createdAt', 'DESC')
            .skip(take * (page - 1) || 0)
            .take(take || 50)
            .getMany();
          break;
        case 'buy':
          alarmList = await builder
            .andWhere('alarm.type = :type', {
              type: 'buy',
            })
            .orderBy('alarmHistory.createdAt', 'DESC')
            .skip(take * (page - 1) || 0)
            .take(take || 50)
            .getMany();
          break;
        case 'sell':
          alarmList = await builder
            .andWhere('alarm.type = :type', {
              type: 'sell',
            })
            .orderBy('alarmHistory.createdAt', 'DESC')
            .skip(take * (page - 1) || 0)
            .take(take || 50)
            .getMany();
          break;
        case 'mint':
          alarmList = await builder
            .andWhere('alarm.type = :type', {
              type: 'mint',
            })
            .orderBy('alarmHistory.createdAt', 'DESC')
            .skip(take * (page - 1) || 0)
            .take(take || 50)
            .getMany();
          break;
        case 'oldest':
          alarmList = await builder
            .orderBy('alarmHistory.createdAt', 'ASC')
            .skip(take * (page - 1) || 0)
            .take(take || 50)
            .getMany();
          break;
        case 'purchase':
          alarmList = await builder
            .orderBy('alarm.boughtPrice', 'DESC')
            .skip(take * (page - 1) || 0)
            .take(take || 50)
            .getMany();
          break;
        case 'sale':
          alarmList = await builder
            .orderBy('alarm.salePrice', 'DESC')
            .andWhere('alarm.type = :type', {
              type: 'sell',
            })
            .skip(take * (page - 1) || 0)
            .take(take || 50)
            .getMany();
          break;
        case 'quantity':
          alarmList = await builder
            .orderBy('alarm.quantity', 'DESC')
            .skip(take * (page - 1) || 0)
            .take(take || 50)
            .getMany();
          break;
        case 'profit':
          alarmList = await builder
            .orderBy('alarm.profit', 'DESC')
            .skip(take * (page - 1) || 0)
            .take(take || 50)
            .getMany();
          break;
        default:
          break;
      }

      const totalCount = await builder.getCount();

      const totalPage = Math.ceil(totalCount / take);

      const result = await Promise.all(
        alarmList.map(async (item: any) => {
          const alarm = item?.alarm;
          const rankData = await this.rankRepository.findOne({
            where: {
              accountAddress: In([alarm.makerAddress, alarm.takerAddress]),
              timeType: TimeType['all'],
            },
          });
          const Web3 = require('web3');

          return {
            target: {
              imageUrl: rankData.profileImage,
              name: rankData.username,
              rank: rankData.rank,
              increaseRank: rankData.increaseRank,
              accountAddress: rankData.accountAddress,
            },
            eventTimestamp: alarm.eventTimestamp,
            imageUrl: alarm.imageUrl,
            nftName: alarm.metaName,
            tokenAddress: alarm.tokenAddress,
            tokenId: alarm.tokenId,
            salePrice: alarm.salePrice / 1000000000000000000,
            boughtPrice: alarm.boughtPrice / 1000000000000000000,
            isSell: alarm.type,
            profit:
              alarm.boughtPrice === 0
                ? 0
                : ((alarm.salePrice - alarm.boughtPrice) / alarm.boughtPrice) *
                  100,
            type: alarm.type,
          };
        }),
      );

      return new BaseResponse<any>(true, '', {
        data: result,
        currentPage: page,
        totalPage,
      });
    } catch (err: any) {
      console.log(err.message);
      return new BaseResponse<null>(false, '알람 생성에 실패하였습니다.', null);
    }
  }

  async sendAlarm(
    @Body() sendAlarmDto: SendAlarmDto,
  ): Promise<BaseResponse<boolean>> {
    const { userId } = sendAlarmDto;
    const userData = await this.userRepository.findOne({
      where: { id: userId },
    });
    const fcmToken = userData.fcmToken;
    if (!fcmToken) {
      return new BaseResponse<boolean>(
        true,
        'fcm 토큰이 존재하지 않습니다.',
        false,
      );
    }

    sendNotification({
      token: userData.fcmToken,
      title: `(TEST) NFT transaction has occurred`,
      body: 'TEST',
      data: { path: 'Alarm' },
    });
  }
}
