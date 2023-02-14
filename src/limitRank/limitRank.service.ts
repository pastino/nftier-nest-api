import { Injectable } from '@nestjs/common';
import { BaseResponse } from '@src/commons/response/base.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { limitRankEntity } from './entities/limitRank.entity';

@Injectable()
export class LimitRankService {
  constructor(
    @InjectRepository(limitRankEntity)
    private readonly limitRankRepository: Repository<limitRankEntity>,
  ) {}

  async getLimitRankData(): Promise<BaseResponse<any>> {
    try {
      const data = await this.limitRankRepository.find();
      return new BaseResponse<any>(true, '', data?.[0]);
    } catch (err: any) {
      console.log(err.message);
      return new BaseResponse<null>(false, '', null);
    }
  }
}
