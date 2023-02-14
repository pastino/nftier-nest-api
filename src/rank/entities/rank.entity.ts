import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from 'src/commons/entities/base.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ValueTransformer,
} from 'typeorm';
import { RankType, TimeType } from '../dto/getRankDto.dto';

export const bigint: ValueTransformer = {
  to: (entityValue: bigint) => entityValue,
  from: (databaseValue: string): bigint => BigInt(databaseValue),
};

@Entity({ name: 'rank' })
export class RankEntity extends BaseTimeEntity {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Uniqe ID',
  })
  @PrimaryGeneratedColumn({ type: 'int' })
  @Column({
    name: 'id',
    type: 'int',
    nullable: false,
    primary: true,
  })
  id: number;

  @ApiProperty({
    type: String,
    example: 'income',
    description: '랭킹 조회 타입 (지갑수익 순, 자산 순, 거래량 순)',
  })
  @Column()
  rankType: RankType;

  @ApiProperty({
    enum: TimeType,
    example: '24h',
    description: '조회되는 시간 범위',
  })
  @Column()
  timeType: TimeType;

  @ApiProperty({
    enum: String,
    example: '0xD37E2eA8373b17E2e3f8825E5a83aeD319ddF52d',
    description: '지갑주소',
  })
  @Column()
  accountAddress: string;

  @ApiProperty({
    type: Number,
    example: 5300000000000000,
    description: '판매된 NFT 수익 전체',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  incomeInSold: number;

  @ApiProperty({
    type: Number,
    example: 5300000000000000,
    description: '판매되지 않은 NFT 예상 수익',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  incomeInSelling: number;

  @ApiProperty({
    type: Number,
    example: 5300000000000000,
    description: 'NFT 수익 합계',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  income: number;

  @ApiProperty({
    type: Number,
    example: 5300000000000000,
    description: '총 투자 금액',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  investmentValue: number;

  @ApiProperty({
    type: Number,
    example: 500,
    description: '수익율',
  })
  @Column()
  profit: number;

  @ApiProperty({
    type: Number,
    example: 500,
    description: '구매수량',
  })
  @Column()
  boughtTradeCount: number;

  @ApiProperty({
    type: Number,
    example: 500,
    description: '판매수량',
  })
  @Column()
  soldTradeCount: number;

  @ApiProperty({
    type: Number,
    example: 500,
    description: '전체 거래 수량',
  })
  @Column()
  totalTradeCount: number;

  @ApiProperty({
    type: Number,
    example: 500,
    description: 'NFT 자산 금액',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  nftTotalValue: number;

  @ApiProperty({
    type: Number,
    example: 500,
    description: '지갑 보유 금액',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  walletBalance: number;

  @ApiProperty({
    type: Number,
    example: 500,
    description: '전체 자산',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalAssetValue: number;

  @ApiProperty({
    type: String,
    example: 500,
    description: '닉네임',
  })
  @Column()
  username: string;

  @ApiProperty({
    type: String,
    example: 500,
    description: '프로필 이미지 url',
  })
  @Column()
  profileImage: string;

  @ApiProperty({
    type: Number,
    example: 4,
    description: '증감된 순위',
  })
  @Column()
  increaseRank: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: '순위',
  })
  @Column()
  rank: number;

  @ApiProperty({
    type: Number,
    example: 1123,
    description: 'NFT 갯수',
  })
  @Column()
  itemCount: number;

  @ApiProperty({
    type: Date,
    example: '',
    description: '생성된 시간',
  })
  @Column()
  createdAt: Date;

  @ApiProperty({
    type: Date,
    example: '',
    description: '지갑 생성 시간',
  })
  @Column({ select: true, nullable: true, default: null })
  walletCreatedAt: Date;

  @ApiProperty({
    type: String,
    example: '',
    description: '생성된 기준 시간',
  })
  @Column()
  standardTime: string;

  @ApiProperty({
    type: Number,
    example: 1,
    description: '전체기간 순위',
  })
  @Column()
  allRank: number;

  @ApiProperty({
    type: Number,
    example: 5300000000000000,
    description: '전체기간 판매된 NFT 수익 전체',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  allIncomeInSold: number;

  @ApiProperty({
    type: Number,
    example: 5300000000000000,
    description: '전체기간 판매되지 않은 NFT 예상 수익',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  allIncomeInSelling: number;

  @ApiProperty({
    type: Number,
    example: 5300000000000000,
    description: '전체기간 NFT 수익 합계',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  allIncome: number;

  @ApiProperty({
    type: Number,
    example: 5300000000000000,
    description: '전체기간 총 투자 금액',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  allInvestmentValue: number;

  @ApiProperty({
    type: Number,
    example: 500,
    description: '전체기간 수익율',
  })
  @Column()
  allProfit: number;

  @ApiProperty({
    type: Number,
    example: 500,
    description: '전체기간 구매수량',
  })
  @Column()
  allBoughtTradeCount: number;

  @ApiProperty({
    type: Number,
    example: 500,
    description: '전체기간 판매수량',
  })
  @Column()
  allSoldTradeCount: number;

  @ApiProperty({
    type: Number,
    example: 500,
    description: '전체기간 전체 거래 수량',
  })
  @Column()
  allTotalTradeCount: number;

  @ApiProperty({
    type: Number,
    example: 500,
    description: '전체기간 NFT 자산 금액',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  allNftTotalValue: number;

  @ApiProperty({
    type: Number,
    example: 500,
    description: '전체기간 지갑 보유 금액',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  allWalletBalance: number;

  @ApiProperty({
    type: Number,
    example: 500,
    description: '전체기간 전체 자산',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  allTotalAssetValue: number;
}
