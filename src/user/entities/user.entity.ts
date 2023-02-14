import { ApiProperty } from '@nestjs/swagger';
import { AlarmHistoryEntity } from '@src/alarmHistory/entities/alarmHistory.entity';
import { FollowerEntity } from '@src/follower/entities/follower.entity';
import { BaseTimeEntity } from 'src/commons/entities/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends BaseTimeEntity {
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
    type: String,
    example: '0xD37E2eA8373b17E2e3f8825E5a83aeD319ddF52d',
    description: '지갑주소',
  })
  @Column({ length: 512, nullable: true })
  walletAddress: string;

  @ApiProperty({
    type: String,
    example: 'superman123',
    description: '닉네임',
  })
  @Column({ length: 512, nullable: true })
  nickname: string;

  @ApiProperty({
    type: String,
    example: 'superman123',
    description: '닉네임',
  })
  @Column({ length: 512, nullable: true })
  profileImageUrl: string;

  @ApiProperty({
    type: String,
    example: 'bronze',
    description: '유저 등급 - bronze, gold',
  })
  @Column()
  level: string;

  @ApiProperty({
    type: String,
    example: true,
    description: '알림 Priority',
  })
  @Column()
  isEveryoneAllowed: boolean;

  @ApiProperty({
    type: Number,
    example: 1,
    description: '알람 허용 Priory',
  })
  @Column()
  highPriority: number;

  @ApiProperty({
    type: Number,
    example: 100,
    description: '알람 허용 Priory',
  })
  @Column()
  lowPriority: number;

  @ApiProperty({
    type: String,
    example: 'token',
    description: 'fcm Token',
  })
  @Column({ default: '' })
  fcmToken: string;

  @ApiProperty({
    type: String,
    example: false,
    description: '알람 허용 여부',
  })
  @Column({ default: true })
  isNotiAllowed: boolean;

  @ApiProperty({
    type: String,
    example: false,
    description: '진동만 허용 여부',
  })
  @Column({ default: false })
  isOnlyVibration: boolean;

  @ApiProperty({
    type: String,
    example: false,
    description: '알람 받을 시간 정하기 여부',
  })
  @Column({ default: false })
  isSetTime: boolean;

  @ApiProperty({
    type: String,
    example: '13:50',
    description: '알람 허용시간(시작시간)',
  })
  @Column({ default: '' })
  startAlarmReceiveTime: string;

  @ApiProperty({
    type: String,
    example: '17:00',
    description: '알람 허용시간(종료시간)',
  })
  @Column({ default: '' })
  endAlarmReceiveTime: string;

  @ApiProperty({
    type: String,
    example: -540,
    description: 'local time offset',
  })
  @Column()
  localTimeOffset: number;

  @OneToMany(() => AlarmHistoryEntity, (alarmHistory) => alarmHistory.userId, {
    onDelete: 'CASCADE',
  })
  alarmHistory: AlarmHistoryEntity[];

  @OneToMany(() => FollowerEntity, (follower) => follower.userId, {
    onDelete: 'CASCADE',
  })
  follower: FollowerEntity[];
}
