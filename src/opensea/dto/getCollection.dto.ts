import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetCollectionDto {
  @ApiProperty({
    type: String,
    example: '0xD37E2eA8373b17E2e3f8825E5a83aeD319ddF52d',
    description: '지갑주소',
  })
  @IsString()
  walletAddress: string;

  @ApiProperty({
    type: String,
    example: 1,
    description: '불러올 페이지',
  })
  @IsString()
  page: number;

  @ApiProperty({
    type: Number,
    example: 30,
    description: '호출 당 가져올 itme 갯수',
  })
  @IsOptional()
  take?: number = 30;
}
