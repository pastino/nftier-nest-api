import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RankEntity } from '../entities/rank.entity';

export class CreateRankDto {
  @ApiProperty({
    type: Array,
    example: [],
    description: '순위정보 리스트',
  })
  @IsNotEmpty()
  rankList: RankEntity[];

  @ApiProperty({
    type: Boolean,
    example: false,
    description: '마지막 타임 타입 여부',
  })
  @IsNotEmpty()
  isLast: boolean;
}
