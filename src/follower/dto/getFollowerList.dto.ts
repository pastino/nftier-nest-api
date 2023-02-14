import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum Filter {
  RANK = 'rank',
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export class GetFollowerListDto {
  @ApiProperty({
    enum: Filter,
    default: Filter['RANK'],
    example: 'rank/newest/oldest',
    description: '순위순/최신순/오래된순',
    required: false,
  })
  @IsOptional()
  filter?: Filter = Filter['RANK'];
}
