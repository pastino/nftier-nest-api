import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from 'src/commons/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'limitRank' })
export class limitRankEntity extends BaseTimeEntity {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Uniqe ID',
  })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({
    type: String,
    example: 1,
    description: '무료 이용자 제한 랭크(시작)',
  })
  @Column()
  startRank: number;

  @ApiProperty({
    type: String,
    example: 50,
    description: '무료 이용자 제한 랭크(끝)',
  })
  @Column()
  endRank: number;
}
