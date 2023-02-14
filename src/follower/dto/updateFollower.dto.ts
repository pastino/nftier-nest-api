import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateFollwerDto {
  @ApiProperty({
    type: String,
    example: '0xD37E2eA8373b17E2e3f8825E5a83aeD319ddF52d',
    description: '지갑주소',
  })
  @IsString()
  walletAddress: string;

  @ApiProperty({
    type: String,
    example: true,
    description: '팔로우 혹은 언팔로우',
  })
  @IsBoolean()
  isFollow: boolean;
}
