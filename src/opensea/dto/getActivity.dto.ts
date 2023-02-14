import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetActivityDto {
  @ApiProperty({
    type: String,
    example: '0xD37E2eA8373b17E2e3f8825E5a83aeD319ddF52d',
    description: '지갑주소',
  })
  @IsString()
  walletAddress: string;

  @ApiProperty({
    type: String,
    example: 'LXBrPTY4MTgwMTQ1MzQ=',
    description:
      'A cursor to be supplied as a query param to retrieve the next page',
  })
  // @IsString()
  cursor: string;
}
