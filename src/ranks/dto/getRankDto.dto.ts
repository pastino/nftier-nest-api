import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetRankDetailDto {
  @ApiProperty({
    type: String,
    example: '24h',
    description: '조회되는 시간 범위',
  })
  @IsNotEmpty()
  timeType: string;

  @ApiProperty({
    type: String,
    example: 'income',
    description: '조회되는 순위 타입',
  })
  @IsNotEmpty()
  rankType: string;

  @ApiProperty({
    type: String,
    example: '0xD37E2eA8373b17E2e3f8825E5a83aeD319ddF52d',
    description: '지갑 주',
  })
  @IsNotEmpty()
  accountAddress: string;
}
