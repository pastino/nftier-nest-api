import { ApiProperty } from '@nestjs/swagger';
import { RankType, TimeType } from '@src/rank/dto/getRankDto.dto';
import moment from 'moment';
import { BaseTimeEntity } from 'src/commons/entities/base.entity';
import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ranks' })
export class RanksEntity extends BaseTimeEntity {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Uniqe ID',
  })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({
    type: String,
    example: 'income',
    description: '',
  })
  @Column()
  rankType: string;

  @ApiProperty({
    type: String,
    example: 'all',
    description: '',
  })
  @Column()
  timeType: string;

  @ApiProperty({
    type: Number,
    example: 0,
    description: '',
  })
  @Column()
  increaseRank: number;

  @ApiProperty({
    type: Number,
    example: 2,
    description: '',
  })
  @Column()
  rank: number;

  @ApiProperty({
    type: Date,
    example: '2022-11-23T12:09:58.595+00:00',
    description: '',
  })
  @Column()
  createdAt: Date;

  @ApiProperty({
    type: String,
    example: 'Wed, 23 Nov 2022 11:54:16 GMT',
    description: '',
  })
  @Column()
  standardTime: string;

  @ApiProperty({
    type: String,
    example: '0xd13397383d0b65531f4b1f545e20cba18f063ee3',
    description: '',
  })
  @Column()
  accountAddress: string;

  @ApiProperty({
    type: Number,
    example: 1.0451527599999992e21,
    description: '',
  })
  @Column({ type: 'decimal', precision: 30, scale: 29, default: 0 })
  incomeInSold: number;

  @ApiProperty({
    type: Number,
    example: 0,
    description: '',
  })
  @Column({ type: 'decimal', precision: 30, scale: 29, default: 0 })
  incomeInSelling: number;

  @ApiProperty({
    type: Number,
    example: 1.0451527599999992e21,
    description: '',
  })
  @Column({ type: 'decimal', precision: 30, scale: 29, default: 0 })
  income: number;

  @ApiProperty({
    type: Number,
    example: 1.0451527599999992e21,
    description: '',
  })
  @Column({ type: 'decimal', precision: 30, scale: 29, default: 0 })
  investmentValue: number;

  @ApiProperty({
    type: Number,
    example: 419.2531413014737,
    description: '',
  })
  @Column({ type: 'decimal', precision: 30, scale: 29, default: 0 })
  profit: number;

  @ApiProperty({
    type: Number,
    example: 264,
    description: '',
  })
  @Column()
  boughtTradeCount: number;

  @ApiProperty({
    type: Number,
    example: 419,
    description: '',
  })
  @Column()
  soldTradeCount: number;

  @ApiProperty({
    type: Number,
    example: 683,
    description: '',
  })
  @Column()
  totalTradeCount: number;

  @ApiProperty({
    type: Number,
    example: 1.0451527599999992e21,
    description: '',
  })
  @Column({ type: 'decimal', precision: 30, scale: 29, default: 0 })
  nftTotalValue: number;

  @ApiProperty({
    type: Number,
    example: 1.0451527599999992e21,
    description: '',
  })
  @Column({ type: 'decimal', precision: 30, scale: 29, default: 0 })
  walletBalance: number;

  @ApiProperty({
    type: Number,
    example: 1.0451527599999992e21,
    description: '',
  })
  @Column({ type: 'decimal', precision: 30, scale: 29, default: 0 })
  totalAssetValue: number;

  @ApiProperty({
    type: String,
    example: '-B_A_G-',
    description: '',
  })
  @Column()
  username: string;

  @ApiProperty({
    type: String,
    example:
      'https://i.seadn.io/gae/6WmYpS8aKre7Cgt2NHDGNu_k8qmdx9q7Tc_zXHjL-hPUGd2…',
    description: '',
  })
  @Column()
  profileImage: string;

  @ApiProperty({
    type: Number,
    example: 0,
    description: '',
  })
  @Column()
  allRank: number;

  @ApiProperty({
    type: Number,
    example: 1.0451527599999992e21,
    description: '',
  })
  @Column({ type: 'decimal', precision: 30, scale: 29, default: 0 })
  allIncomeInSold: number;

  @ApiProperty({
    type: Number,
    example: 0,
    description: '',
  })
  @Column({ type: 'decimal', precision: 30, scale: 29, default: 0 })
  allIncomeInSelling: number;

  @ApiProperty({
    type: Number,
    example: 1.0451527599999992e21,
    description: '',
  })
  @Column({ type: 'decimal', precision: 30, scale: 29, default: 0 })
  allIncome: number;

  @ApiProperty({
    type: Number,
    example: 1.0451527599999992e21,
    description: '',
  })
  @Column({ type: 'decimal', precision: 30, scale: 29, default: 0 })
  allInvestmentValue: number;

  @ApiProperty({
    type: Number,
    example: 419.2531413014737,
    description: '',
  })
  @Column({ type: 'decimal', precision: 30, scale: 29, default: 0 })
  allProfit: number;

  @ApiProperty({
    type: Number,
    example: 264,
    description: '',
  })
  @Column()
  allBoughtTradeCount: number;

  @ApiProperty({
    type: Number,
    example: 419,
    description: '',
  })
  @Column()
  allSoldTradeCount: number;

  @ApiProperty({
    type: Number,
    example: 683,
    description: '',
  })
  @Column()
  allTotalTradeCount: number;

  @ApiProperty({
    type: Number,
    example: 1.0451527599999992e21,
    description: '',
  })
  @Column({ type: 'decimal', precision: 30, scale: 29, default: 0 })
  allNftTotalValue: number;

  @ApiProperty({
    type: Number,
    example: 1.0451527599999992e21,
    description: '',
  })
  @Column({ type: 'decimal', precision: 30, scale: 29, default: 0 })
  allWalletBalance: number;

  @ApiProperty({
    type: Number,
    example: 1.0451527599999992e21,
    description: '',
  })
  @Column({ type: 'decimal', precision: 30, scale: 29, default: 0 })
  allTotalAssetValue: number;
}
