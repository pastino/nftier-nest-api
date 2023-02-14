import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from 'src/commons/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'nftListing' })
export class NftListingEntity extends BaseTimeEntity {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Uniqe ID',
  })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({
    type: Number,
    example: 1674411723,
    description: '',
  })
  @Column({ nullable: true })
  listingTime: number;

  @ApiProperty({
    type: Number,
    example: 1677090123,
    description: '',
  })
  @Column({ nullable: true })
  expirationTime: number;

  @ApiProperty({
    type: String,
    example:
      '0xb1d4f81c1e1a9ae55be738d3ae0bb5cecbdfdec7572ccefdac2a9c94075dc49c',
    description: '',
  })
  @Column({ nullable: true })
  orderHash: string;

  @ApiProperty({
    type: String,
    example: '0x00000000006c3852cbef3e08e8df289169ede581',
    description: '',
  })
  @Column({ nullable: true })
  protocolAddress: string;

  @ApiProperty({
    type: Number,
    example: 28181346,
    description: '',
  })
  @Column({ nullable: true })
  makerUser: number;

  @ApiProperty({
    type: String,
    example:
      'https://storage.googleapis.com/opensea-static/opensea-profile/9.png',
    description: '',
  })
  @Column({ nullable: true })
  makerProfileImgUrl: string;

  @ApiProperty({
    type: String,
    example: '0xb58489ca644513558e2836377b15a7c1514e722b',
    description: '',
  })
  @Column({ nullable: true })
  makerAddress: string;

  @ApiProperty({
    type: String,
    example: '',
    description: '',
  })
  @Column({ nullable: true })
  makerConfig: string;

  @ApiProperty({
    type: String,
    example: '100000000000000',
    description: '',
  })
  @Column({ type: String, default: '0' })
  currentPrice: string;

  @ApiProperty({
    type: String,
    example: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
    description: '',
  })
  @Column({ nullable: true })
  tokenAddress: string;

  @ApiProperty({
    type: String,
    example:
      '8958479286932398496643110087793932012132596413393670145759465498324158…',
    description: '',
  })
  @Column({ nullable: true })
  tokenId: string;

  @ApiProperty({
    type: Date,
    example: '2023-01-22T18:24:14.821346',
    description: '',
  })
  @Column({ nullable: true })
  createdDate: Date;
  @ApiProperty({
    type: Date,
    example: '2023-02-22T18:22:03',
    description: '',
  })
  @Column({ nullable: true })
  closingDate: Date;
}
