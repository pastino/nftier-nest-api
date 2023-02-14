import { Injectable, Query } from '@nestjs/common';
import { GetUser } from '@src/commons/decorator/get-user.decorator';
import { UserEntity } from '@src/user/entities/user.entity';
import { GetGalleryDto } from './dto/getGallery.dto';
import axios from 'axios';
import { GetCollectionDto } from './dto/getCollection.dto';
import { GetActivityDto } from './dto/getActivity.dto';
import { BaseResponse } from '@src/commons/response/base.response';
// This script demonstrates access to the NFT API via the Alchemy SDK.
// import { Network, Alchemy, NftExcludeFilters } from 'alchemy-sdk';
import { GetCollectionItemListDto } from './dto/getCollectionItemList.dto';
import { OpenSeaSDK, Network } from 'opensea-js';
import * as Web3 from 'web3';
@Injectable()
export class OpneSeaService {
  constructor() {}

  async getGalleryList(
    @GetUser() user: UserEntity,
    @Query() getGalleryDto: GetGalleryDto,
  ): Promise<BaseResponse<any>> {
    const { walletAddress, order, cursor, limit } = getGalleryDto;

    const headerConfig = {
      headers: {
        'X-API-KEY': process.env.OPENSEA_API_KEY,
      },
    };

    // // This example provider won't let you make transactions, only read-only calls:
    // const provider = new Web3.providers.HttpProvider(
    //   'https://mainnet.infura.io',
    // );

    // const openseaSDK = new OpenSeaSDK(provider, {
    //   networkName: Network.Main,
    //   apiKey: process.env.OPENSEA_API_KEY,
    // });

    try {
      const res: any = await axios.get(
        `https://api.opensea.io/api/v1/assets?owner=${walletAddress}&cursor=${
          cursor || ''
        }&order_direction=${order}&limit=${limit}&include_orders=true`,
        headerConfig,
      );
      const assets = res?.data?.assets;
      return new BaseResponse<any>(true, '', {
        cursor: res?.data?.next,
        data: assets.map((item) => {
          let currentPrice = 0;
          let buyPrice = 0;
          if (item?.seaport_sell_orders) {
            const orders = item?.seaport_sell_orders?.[0];
            const closingDate = orders?.closing_date;
            const isValid =
              new Date(closingDate).getTime() > new Date().getTime();

            if (orders && isValid) {
              currentPrice = orders?.current_price;
            }
          }
          if (item?.last_sale) {
            buyPrice = item?.last_sale?.total_price;
          }

          const Web3 = require('web3');
          return {
            id: item.id,
            imageUrl: item.image_preview_url,
            name: item.name,
            collectionName: item.collection.name,
            description: item.description,
            externalLink: item.external_link,
            createdDate: item.asset_contract.created_date,
            tokenAddress: item.asset_contract.address,
            tokenId: item.token_id,
            owner: item.owner,
            creator: item.creator,
            lastSale: item.last_sale,
            topBid: item.top_bid,
            listingDate: item.listing_date,
            collectionImageUrl: item.collection.image_url,
            profit:
              currentPrice === 0 || buyPrice === 0
                ? 0
                : ((currentPrice - buyPrice) / buyPrice) * 100,
            currentPrice: Number(
              Web3.utils.fromWei(String(currentPrice), 'ether'),
            ),
            buyPrice: Number(Web3.utils.fromWei(String(buyPrice), 'ether')),
            slug: item.collection.slug,
            permalink: item.permalink,
            homelink: item?.collection?.external_url,
            discordlink: item?.collection?.discord_url,
          };
        }),
      });
    } catch (err: any) {
      console.log(err.message);
      return new BaseResponse<null>(
        false,
        'activity api 전송에 실패하였습니다.',
        null,
      );
    }
  }

  async getGalleryAlchemyList(
    @GetUser() user: UserEntity,
    @Query() getGalleryDto: GetGalleryDto,
  ): Promise<BaseResponse<any>> {
    try {
      const { walletAddress, order, cursor, limit } = getGalleryDto;

      // // Optional Config object, but defaults to demo api-key and eth-mainnet.
      // const settings = {
      //   apiKey: 'izPO5-h0NhIZdoCTq3sHPQWCNnGKEUbq', // Replace with your Alchemy API Key.
      //   network: Network.ETH_MAINNET, // Replace with your network.
      // };

      // const alchemy = new Alchemy(settings);

      // // Print total NFT count returned in the response:
      // const nftsForOwner = await alchemy.nft.getNftsForOwner(walletAddress, {
      //   omitMetadata: false,
      //   excludeFilters: [NftExcludeFilters.SPAM, NftExcludeFilters.AIRDROPS],
      // });

      // console.log(nftsForOwner);

      return new BaseResponse<any>(true, '', null);
    } catch (err: any) {
      console.log(err.message);
      return new BaseResponse<null>(
        false,
        'activity api 전송에 실패하였습니다.',
        null,
      );
    }
  }

  async getCollectionList(
    @GetUser() user: UserEntity,
    @Query() getCollectionDto: GetCollectionDto,
  ): Promise<BaseResponse<any>> {
    const { walletAddress, page, take } = getCollectionDto;
    const headerConfig = {
      headers: {
        'X-API-KEY': process.env.OPENSEA_API_KEY,
      },
    };

    const offset = take * page;

    try {
      const res: any = await axios.get(
        `https://api.opensea.io/api/v1/collections?asset_owner=${walletAddress}&offset=${offset}&limit=${take}`,
        headerConfig,
      );

      const collections = res?.data;

      return new BaseResponse<any>(true, '', {
        collections,
      });
    } catch (err: any) {
      console.log(err);
      return new BaseResponse<null>(
        false,
        'activity api 전송에 실패하였습니다.',
        null,
      );
    }
  }

  async getCollectionItemList(
    @GetUser() user: UserEntity,
    @Query() getCollectionItemListDto: GetCollectionItemListDto,
  ): Promise<BaseResponse<any>> {
    const { slug, order, cursor, limit } = getCollectionItemListDto;

    const headerConfig = {
      headers: {
        'X-API-KEY': process.env.OPENSEA_API_KEY,
      },
    };

    try {
      const res: any = await axios.get(
        `https://api.opensea.io/api/v1/assets?collection_slug=${slug}&cursor=${
          cursor || ''
        }&order_direction=${order}&limit=${limit}&include_orders=true`,
        headerConfig,
      );
      const assets = res?.data?.assets;

      return new BaseResponse<any>(true, '', {
        cursor: res?.data?.next,
        data: assets,
      });
    } catch (err: any) {
      console.log(err.message);
      return new BaseResponse<null>(
        false,
        'activity api 전송에 실패하였습니다.',
        null,
      );
    }
  }

  async getActivityList(
    @GetUser() user: UserEntity,
    @Query() getActivityDto: GetActivityDto,
  ): Promise<BaseResponse<any>> {
    const { walletAddress, cursor } = getActivityDto;
    const headerConfig = {
      headers: {
        'X-API-KEY': process.env.OPENSEA_API_KEY,
      },
    };

    try {
      const res: any = await axios.get(
        `https://api.opensea.io/api/v1/events?only_opensea=true&account_address=${walletAddress}` +
          `${!cursor ? '' : `&cursor=${cursor}`}`,
        headerConfig,
      );
      const nextCursor = res?.data?.next;
      const events = res?.data?.asset_events;

      return new BaseResponse<any>(true, '', {
        nextCursor,
        events,
      });
    } catch (err: any) {
      console.log(err);
      return new BaseResponse<null>(
        false,
        'activity api 전송에 실패하였습니다.',
        null,
      );
    }
  }
}
