import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmpty, IsEnum, IsNotEmpty } from 'class-validator';

export enum TimeType {
  'hot' = 'hot',
  '24h' = '24h',
  '1w' = '1w',
  '2w' = '2w',
  '1m' = '1m',
  '3m' = '3m',
  'all' = 'all',
}

export enum RankType {
  income = 'income',
  balance = 'balance',
  trade = 'trade',
}

export class GetRankDto {
  @ApiProperty({
    type: RankType,
    example: '24h',
    description: '조회되는 시간 범위',
  })
  // @IsEnum(TimeType)
  @IsNotEmpty()
  timeType: TimeType;

  @ApiProperty({
    type: RankType,
    example: 'income',
    description: '조회되는 순위 타입',
  })
  @IsNotEmpty()
  rankType: RankType;

  @ApiProperty({
    type: Array,
    example: [1, 50],
    description: '조회 범위',
  })
  @ApiPropertyOptional({
    required: false,
  })
  range: number[] | string[];
}
