import { ApiProperty } from '@nestjs/swagger';

export class CreateWatchWalletDto {
  @ApiProperty({
    type: Array,
    example: ['0xD37E2eA8373b17E2e3f8825E5a83aeD319ddF52d'],
    description: '지갑주소 리스트',
  })
  walletAddressList: string[];
}
