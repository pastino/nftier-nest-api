import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { UserEntity } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { OpenSeaModule } from './opensea/opensea.module';
import { RankEntity } from './rank/entities/rank.entity';
import { RankModule } from './rank/rank.module';
import { FollowerModule } from './follower/follower.module';
import { FollowerEntity } from './follower/entities/follower.entity';
import { AlarmEntity } from './alarm/entities/alarm.entity';
import { AlarmModule } from './alarm/alarm.module';
import { AlarmHistoryModule } from './alarmHistory/alarmHistory.module';
import { AlarmHistoryEntity } from './alarmHistory/entities/alarmHistory.entity';
import { AuthModule } from './auth/auth.module';
import { limitRankEntity } from './limitRank/entities/limitRank.entity';
import { LimitRankModule } from './limitRank/limitRank.module';
import { NftListingEntity } from './nftListing/entities/nftListing.entity';
import { NftSuccessfulEventEntity } from './nftSuccessfulEvent/entities/nftSuccessfulEvent.entity';
import { RanksEntity } from './ranks/entities/ranks.entity';
import { WatchWalletsEntity } from './watchWallets/entities/watchWallets.entity';
import { RanksModule } from './ranks/ranks.module';
import { WatchWalletModule } from './watchWallets/watchWallets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        DB_HOST: Joi.string(),
        DB_PORT: Joi.string(),
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_NAME: Joi.string(),
        JWT_SECRET: Joi.string(),
        MORALIS_API_KEY: Joi.string(),
        OPENSEA_API_KEY: Joi.string(),
        ETHERSCAN_API_KEY: Joi.string(),
      }),
    }),
    TypeOrmModule.forRoot({
      bigNumberStrings: false,
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      //process.env.NODE_ENV !== 'prod',
      logging:
        process.env.NODE_ENV !== 'prod' &&
        process.env.NODE_ENV !== 'test' &&
        process.env.NODE_ENV !== 'dev',
      entities: [
        UserEntity,
        RankEntity,
        FollowerEntity,
        AlarmEntity,
        AlarmHistoryEntity,
        limitRankEntity,
        NftListingEntity,
        NftSuccessfulEventEntity,
        RanksEntity,
        WatchWalletsEntity,
      ],
    }),
    AuthModule,
    UserModule,
    OpenSeaModule,
    RankModule,
    RanksModule,
    FollowerModule,
    AlarmModule,
    AlarmHistoryModule,
    LimitRankModule,
    WatchWalletModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
