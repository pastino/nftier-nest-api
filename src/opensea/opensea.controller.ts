import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '@src/commons/decorator/get-user.decorator';
import { UserEntity } from '@src/user/entities/user.entity';
import { GetActivityDto } from './dto/getActivity.dto';
import { GetCollectionDto } from './dto/getCollection.dto';
import { GetCollectionItemListDto } from './dto/getCollectionItemList.dto';
import { GetGalleryDto } from './dto/getGallery.dto';
import { OpneSeaService } from './opensea.service';

@ApiBearerAuth()
@ApiTags('OpneSea api')
@Controller('opensea')
@UseInterceptors(ClassSerializerInterceptor)
export class OpenSeaController {
  constructor(private userService: OpneSeaService) {}

  @Get('/gallery')
  async getGalleryList(
    @GetUser() user: UserEntity,
    @Query() getGalleryDto: GetGalleryDto,
  ): Promise<any> {
    return await this.userService.getGalleryList(user, getGalleryDto);
  }
  @Get('/alchemy/gallery')
  async getGalleryAlchemyList(
    @GetUser() user: UserEntity,
    @Query() getGalleryDto: GetGalleryDto,
  ): Promise<any> {
    return await this.userService.getGalleryAlchemyList(user, getGalleryDto);
  }

  @Get('/collection')
  async getCollectionList(
    @GetUser() user: UserEntity,
    @Query() getCollectionDto: GetCollectionDto,
  ): Promise<any> {
    return await this.userService.getCollectionList(user, getCollectionDto);
  }

  @Get('/collection/items')
  async getCollectionItemList(
    @GetUser() user: UserEntity,
    @Query() getCollectionItemListDto: GetCollectionItemListDto,
  ): Promise<any> {
    return await this.userService.getCollectionItemList(
      user,
      getCollectionItemListDto,
    );
  }

  @Get('/activity')
  async getActivityList(
    @GetUser() user: UserEntity,
    @Query() getActivityDto: GetActivityDto,
  ): Promise<any> {
    return await this.userService.getActivityList(user, getActivityDto);
  }
}
