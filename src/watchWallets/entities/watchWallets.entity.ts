import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from 'src/commons/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'watchWallets' })
export class WatchWalletsEntity extends BaseTimeEntity {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Uniqe ID',
  })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({
    type: String,
    example: '0xb58489ca644513558e2836377b15a7c1514e722b',
    description: '',
  })
  @Column()
  accountAddress: string;

  @ApiProperty({
    type: Date,
    example: '2022-11-14T02:54:49.380+00:00',
    description: '',
  })
  @Column()
  dateTime: Date;
}
