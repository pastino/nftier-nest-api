import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowerEntity } from './entities/follower.entity';
import { FollowerController } from './follower.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@src/jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { FollowerService } from './follower.service';
import { UserEntity } from '@src/user/entities/user.entity';
import { RankEntity } from '@src/rank/entities/rank.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([FollowerEntity, UserEntity, RankEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [FollowerController],
  providers: [FollowerService],
})
export class FollowerModule {}
