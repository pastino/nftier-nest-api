import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from 'src/commons/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'nftSuccessfulEvent' })
export class NftSuccessfulEventEntity extends BaseTimeEntity {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Uniqe ID',
  })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({
    type: String,
    example:
      'https://i.seadn.io/gcs/files/29314e8afb9cb2f4fed0efc3523cc838.gif?w=50…',
    description: '',
  })
  @Column({ nullable: true })
  imageUrl: string;

  @ApiProperty({
    type: String,
    example:
      'https://i.seadn.io/gcs/files/29314e8afb9cb2f4fed0efc3523cc838.gif?w=50…',
    description: '',
  })
  @Column({ nullable: true })
  imagePreviewUrl: string;

  @ApiProperty({
    type: String,
    example:
      'https://i.seadn.io/gcs/files/29314e8afb9cb2f4fed0efc3523cc838.gif?w=50…',
    description: '',
  })
  @Column({ nullable: true })
  imageThumbnailUrl: string;

  @ApiProperty({
    type: String,
    example: 'ipfs://QmduHnZHG27LVV2kTtiP9w6ZdbNj8MbmR1a7g8davQjoUS',
    description: '',
  })
  @Column({ nullable: true })
  imageOriginalUrl: string;

  @ApiProperty({
    type: String,
    example: '',
    description: '',
  })
  @Column({ nullable: true })
  animationUrl: string;

  @ApiProperty({
    type: String,
    example: '',
    description: '',
  })
  @Column({ nullable: true })
  animationOriginalUrl: string;

  @ApiProperty({
    type: String,
    example: 'Armory Token',
    description: '',
  })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({
    type: String,
    example:
      'This is a shiny token. Use case unknown. Supply is limited and deflati…',
    description: '',
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    type: String,
    example: '',
    description: '',
  })
  @Column({ nullable: true })
  externalLink: string;

  @ApiProperty({
    type: String,
    example: '0xd1b68763c7170b963ac6ca6b1c2ea25796a18a17',
    description: '',
  })
  @Column({ nullable: true })
  tokenAddress: string;

  @ApiProperty({
    type: String,
    example: 'ERC1155',
    description: '',
  })
  @Column({ nullable: true })
  schemaName: string;

  @ApiProperty({
    type: String,
    example:
      'https://i.seadn.io/gcs/files/860f8205ba7ddbf2234b87694c26e7ad.png?w=50…',
    description: '',
  })
  @Column({ nullable: true })
  collectionImageUrl: string;

  @ApiProperty({
    type: String,
    example:
      'https://opensea.io/assets/ethereum/0xd1b68763c7170b963ac6ca6b1c2ea2579…',
    description: '',
  })
  @Column({ nullable: true })
  permalink: string;

  @ApiProperty({
    type: String,
    example: '',
    description: '',
  })
  @Column({ nullable: true })
  discordUrl: string;

  @ApiProperty({
    type: String,
    example: 'valhallareserve',
    description: '',
  })
  @Column({ nullable: true })
  slug: string;

  @ApiProperty({
    type: String,
    example: '',
    description: '',
  })
  @Column({ nullable: true })
  twitterUsername: string;

  @ApiProperty({
    type: String,
    example: '1',
    description: '',
  })
  @Column({ nullable: true })
  tokenId: string;

  @ApiProperty({
    type: String,
    example: 'successful',
    description: '',
  })
  @Column({ nullable: true })
  eventType: string;

  @ApiProperty({
    type: Date,
    example: '2022-12-18T01:10:47.000+00:00',
    description: '',
  })
  @Column({ nullable: true })
  eventTimestamp: Date;

  @ApiProperty({
    type: Number,
    example: 123123123,
    description: '',
  })
  @Column({ type: 'bigint' })
  eventTimestampNumber: number;

  @ApiProperty({
    type: Date,
    example: '2022-12-18T01:10:50.010+00:00',
    description: '',
  })
  @Column({ nullable: true })
  createdDate: Date;

  @ApiProperty({
    type: String,
    example: '',
    description: '',
  })
  @Column({ nullable: true })
  auctionType: string;

  @ApiProperty({
    type: String,
    example: '100000000000000',
    description: '',
  })
  @Column({ type: String, default: '0' })
  totalPrice: string;

  @ApiProperty({
    type: String,
    example: 'WETH',
    description: '',
  })
  @Column({ nullable: true })
  paymentTokenSymbol: string;

  @ApiProperty({
    type: Number,
    example: 1,
    description: '',
  })
  @Column({ nullable: true })
  quantity: number;

  @ApiProperty({
    type: String,
    example: '',
    description: '',
  })
  @Column({ nullable: true })
  approvedAccount: string;

  @ApiProperty({
    type: Number,
    example: '',
    description: '',
  })
  @Column({ nullable: true })
  bidAmount: number;

  @ApiProperty({
    type: String,
    example: 'valhallareserve',
    description: '',
  })
  @Column({ nullable: true })
  collectionSlug: string;

  @ApiProperty({
    type: String,
    example: '0x00000000006c3852cbef3e08e8df289169ede581',
    description: '',
  })
  @Column({ nullable: true })
  contractAddress: string;

  @ApiProperty({
    type: String,
    example: '',
    description: '',
  })
  @Column({ nullable: true })
  sellerUserName: string;

  @ApiProperty({
    type: String,
    example:
      'https://storage.googleapis.com/opensea-static/opensea-profile/23.png',
    description: '',
  })
  @Column({ nullable: true })
  sellerUserProfileImgUrl: string;

  @ApiProperty({
    type: String,
    example: '0x8e116a6baf5a311b88ac66da92036e0ea19ebb8f',
    description: '',
  })
  @Column({ nullable: true })
  sellerAddress: string;

  @ApiProperty({
    type: String,
    example: 'Mcghee',
    description: '',
  })
  @Column({ nullable: true })
  buyerUserName: string;

  @ApiProperty({
    type: String,
    example:
      'https://storage.googleapis.com/opensea-static/opensea-profile/9.png',
    description: '',
  })
  @Column({ nullable: true })
  buyerUserProfileImgUrl: string;

  @ApiProperty({
    type: String,
    example: '0xb58489ca644513558e2836377b15a7c1514e722b',
    description: '',
  })
  @Column({ nullable: true })
  buyerAddress: string;

  @ApiProperty({
    type: Date,
    example: '',
    description: '',
  })
  @Column({ nullable: true })
  listingTime: Date;

  @ApiProperty({
    type: String,
    example: '',
    description: '',
  })
  @Column({ nullable: true })
  type: string;

  @ApiProperty({
    type: String,
    example: '0xb58489ca644513558e2836377b15a7c1514e722b',
    description: '',
  })
  @Column({ nullable: true })
  targetAddress: string;

  @ApiProperty({
    type: String,
    example: '100000000000000',
    description: '',
  })
  @Column({ type: String, default: '0' })
  boughtPrice: string;

  @ApiProperty({
    type: Boolean,
    example: true,
    description: '',
  })
  @Column()
  isBoughtPriceUpated: boolean;

  @ApiProperty({
    type: String,
    example: '',
    description: '',
  })
  @Column()
  sessionUUID: string;
}
