import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@src/commons/enum/order.enum';
import { IsEnum, IsString } from 'class-validator';

export class GetGalleryDto {
  @ApiProperty({
    type: String,
    example: '0xD37E2eA8373b17E2e3f8825E5a83aeD319ddF52d',
    description: '지갑주소',
  })
  @IsString()
  walletAddress: string;

  @ApiProperty({
    enum: Order,
    default: Order.DESC,
    example: 'desc',
    description: '정렬순서',
  })
  @IsEnum(Order)
  @IsString()
  order: string;

  @ApiProperty({
    type: String,
    example: '',
    description: 'cursor',
  })
  cursor: string;

  @ApiProperty({
    type: String,
    example: 30,
    description: '가져올 데이터 수',
  })
  limit: number;
}
