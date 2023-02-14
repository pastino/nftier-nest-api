import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UserUpdateDataDto {
  @ApiProperty({
    type: String,
    example: 'bronze',
    description: '유저 등급 - bronze, gold',
  })
  @IsOptional()
  level: string;

  @ApiProperty({
    type: String,
    example: true,
    description: '알림 Priority',
  })
  @IsOptional()
  isEveryoneAllowed: boolean;

  @ApiProperty({
    type: String,
    example: 'token',
    description: 'fcm Token',
  })
  @IsOptional()
  fcmToken: string;

  @ApiProperty({
    type: String,
    example: false,
    description: '알람 허용 여부',
  })
  @IsOptional()
  isNotiAllowed: boolean;

  @ApiProperty({
    type: String,
    example: false,
    description: '진동만 허용 여부',
  })
  @IsOptional()
  isOnlyVibration: boolean;

  @ApiProperty({
    type: String,
    example: '13:50',
    description: '알람 허용시간(시작시간)',
  })
  @IsOptional()
  startAlarmReceiveTime: string;

  @ApiProperty({
    type: String,
    example: '17:00',
    description: '알람 허용시간(종료시간)',
  })
  @IsOptional()
  endAlarmReceiveTime: string;
}
