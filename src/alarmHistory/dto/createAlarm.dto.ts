import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAlarmDto {
  @ApiProperty({
    type: Array,
    example: {},
    description: '알람 정보',
  })
  @IsNotEmpty()
  alarmData: string;
}
