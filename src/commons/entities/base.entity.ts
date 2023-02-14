import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseTimeEntity {
  @ApiProperty({
    description: '등록일',
    required: true,
  })
  @CreateDateColumn({ select: true, nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, select: false })
  updatedAt?: Date;
}
