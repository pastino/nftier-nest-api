import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWatchWalletDto } from './dto/createWatchWallet.dto';
import { WatchWalletsEntity } from './entities/watchWallets.entity';

@Injectable()
export class WatchWalletsService {
  constructor(
    @InjectRepository(WatchWalletsEntity)
    private readonly watchWalletRepository: Repository<WatchWalletsEntity>,
  ) {}

  async createWatchWallet(
    @Body() createWatchWalletDto: CreateWatchWalletDto,
  ): Promise<boolean> {
    const { walletAddressList } = createWatchWalletDto;
    for (let i = 0; i < walletAddressList.length; i++) {
      const address = walletAddressList[i];
      const existingWatchWallet = await this.watchWalletRepository.findOne({
        where: {
          accountAddress: address,
        },
      });
      if (existingWatchWallet) {
        console.log('existing');
      }

      console.log('create');
      await this.watchWalletRepository.save({
        accountAddress: address,
        dateTime: new Date(),
      });
    }
    return true;
  }
}
