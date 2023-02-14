import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetAlarmListDto {
  @ApiProperty({
    type: String,
    example: 'newest, ordest, purchase, sale, quantity, profit',
    description: '순서',
  })
  @IsNotEmpty()
  order: string;
}
