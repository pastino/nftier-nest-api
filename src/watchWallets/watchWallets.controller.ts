import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
  Body,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateWatchWalletDto } from './dto/createWatchWallet.dto';
import { WatchWalletsService } from './watchWallets.service';

@ApiBearerAuth()
@ApiTags('Watch Wallet')
@Controller('wallet')
@UseInterceptors(ClassSerializerInterceptor)
export class WatchWalletsController {
  constructor(private watchWalletsService: WatchWalletsService) {}

  @ApiOperation({ summary: 'watch wallet' })
  @Post()
  async createWatchWallet(
    @Body() createWatchWalletDto: CreateWatchWalletDto,
  ): Promise<boolean> {
    return await this.watchWalletsService.createWatchWallet(
      createWatchWalletDto,
    );
  }
}
