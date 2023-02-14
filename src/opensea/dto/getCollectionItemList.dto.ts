import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@src/commons/enum/order.enum';
import { IsEnum, IsString } from 'class-validator';

export class GetCollectionItemListDto {
  @ApiProperty({
    type: String,
    example: 'trunkz',
    description: 'slug 이름',
  })
  @IsString()
  slug: string;

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
