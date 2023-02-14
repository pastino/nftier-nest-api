import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class BaseResponse<T> {
  constructor(isSuccess: boolean, message: string, data: T) {
    this.isSuccess = isSuccess;
    this.message = message;
    this.data = data;
  }

  @ApiProperty({
    required: true,
    description: '응답 성공여부',
  })
  @IsBoolean()
  isSuccess: boolean;

  @ApiProperty({
    required: true,
    description: '메세지',
  })
  message: string;

  @ApiProperty({
    required: true,
    description: '리턴 데이터',
  })
  data: T;
}
