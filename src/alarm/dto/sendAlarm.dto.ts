import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SendAlarmDto {
  @ApiProperty({
    type: Number,
    example: 4,
    description: 'User Id',
  })
  @IsNotEmpty()
  userId: number;
}
