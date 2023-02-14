import { ApiProperty } from '@nestjs/swagger';
import { AlarmEntity } from '@src/alarm/entities/alarm.entity';
import { UserEntity } from '@src/user/entities/user.entity';
import { BaseTimeEntity } from 'src/commons/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'alarmHistory' })
export class AlarmHistoryEntity extends BaseTimeEntity {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Uniqe ID',
  })
  @PrimaryGeneratedColumn({ type: 'int' })
  @Column({
    name: 'id',
    type: 'int',
    nullable: false,
    primary: true,
  })
  id: number;

  @ApiProperty({
    type: Number,
    example: 32,
    description: '유저 ID',
  })
  @Column({ type: 'int', nullable: true })
  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  userId: number | UserEntity;

  @ApiProperty({
    type: Number,
    example: 32,
    description: '알람 ID',
  })
  @Column({ type: 'int', nullable: true })
  @ManyToOne(() => AlarmEntity, (alarm) => alarm.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'alarmId', referencedColumnName: 'id' })
  alarmId: number | AlarmEntity;

  @ApiProperty({
    type: String,
    example: false,
    description: '확인 했는지 여부',
  })
  @Column()
  isChecked: boolean;
}
