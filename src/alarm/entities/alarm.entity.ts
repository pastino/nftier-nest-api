import { ApiProperty } from '@nestjs/swagger';
import { AlarmHistoryEntity } from '@src/alarmHistory/entities/alarmHistory.entity';
import { BaseTimeEntity } from 'src/commons/entities/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'alarm' })
export class AlarmEntity extends BaseTimeEntity {
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
    example: '0xD37E2eA8373b17E2e3f8825E5a83aeD319ddF52d',
    description: '구매자 지갑 주소',
  })
  @Column()
  makerAddress: string;

  @ApiProperty({
    type: String,
    example: '0xD37E2eA8373b17E2e3f8825E5a83aeD319ddF52d',
    description: '판매자 지갑 주소',
  })
  @Column()
  takerAddress: string;

  @ApiProperty({
    type: Number,
    example: 5300000000000000,
    description: '판매금액',
  })
  @Column({ type: 'bigint' })
  salePrice: string;

  @ApiProperty({
    type: Number,
    example: 5300000000000000,
    description: '구매한 금액',
  })
  @Column({ type: 'bigint' })
  boughtPrice: string;

  @ApiProperty({
    type: Number,
    example: 70,
    description: '이익율',
  })
  @Column({ type: 'int' })
  profit: number;

  @ApiProperty({
    type: String,
    example: 'transfer',
    description: '이관인지 구매한건지 - transfer | buy',
  })
  @Column()
  history: string;

  @ApiProperty({
    type: String,
    example: 'sell',
    description: '판매한 이벤트인지 구매한 이벤트인지 - sell | buy',
  })
  @Column()
  type: string;

  @ApiProperty({
    type: Number,
    example: 1,
    description: '판매갯수',
  })
  @Column({ type: 'int' })
  quantity: number;

  @ApiProperty({
    type: String,
    example: 'optimism-quests',
    description: '컬렉션 slug',
  })
  @Column()
  collectionSlug: string;

  @ApiProperty({
    type: Date,
    example: '',
    description: '판매 종료 시간',
  })
  @Column()
  closingDate: Date;

  @ApiProperty({
    type: Date,
    example: '',
    description: '이벤트 시간',
  })
  @Column()
  eventTimestamp: Date;

  @ApiProperty({
    type: String,
    example: 'optimism',
    description: 'chain 이름',
  })
  @Column()
  chainName: string;

  @ApiProperty({
    type: String,
    example:
      'https://i.seadn.io/gae/1oYCifwXeupQqyOzfaKznwVZHe77hmuJkWonu3TopuiN8xdTTlflxfPCCjarHoiWdB5z4k7ckcRQOd1npQuIYIPwPdB3COSHkbJx?w=500&auto=format',
    description: '이미지 url',
  })
  @Column()
  imageUrl: string;

  @ApiProperty({
    type: String,
    example: 'optimism',
    description: '메타 데이터 이름',
  })
  @Column()
  metaName: string;

  @ApiProperty({
    type: String,
    example:
      'https://opensea.io/assets/optimism/0xfa14e1157f35e1dad95dc3f822a9d18c40e360e2/674505',
    description: '링크 (오픈시)',
  })
  @Column()
  permalink: string;

  @ApiProperty({
    type: String,
    example: 'optimism',
    description: 'nft 이름',
  })
  @Column()
  nftName: string;

  @ApiProperty({
    type: String,
    example: '0xfa14e1157f35e1dad95dc3f822a9d18c40e360e2',
    description: '토큰 주소',
  })
  @Column()
  tokenAddress: string;

  @ApiProperty({
    type: String,
    example: '674505',
    description: '토큰 아이디',
  })
  @Column()
  tokenId: string;

  @ApiProperty({
    type: String,
    example: '0xfa14e1157f35e1dad95dc3f822a9d18c40e360e2',
    description: '타겟 지갑 주소',
  })
  @Column()
  targetAddress: string;

  @OneToMany(() => AlarmHistoryEntity, (alarmHistory) => alarmHistory.alarmId, {
    onDelete: 'CASCADE',
  })
  alarmHistory: AlarmHistoryEntity[];
}
