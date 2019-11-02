import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Channel } from "~/channel/channel.entity";
import { Repository } from "typeorm";
import { AppsService } from "~/apps/apps.service";
import { ChannelDto } from "~/channel/channel.dto";
import RandToken from "rand-token";

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>,
    private appsService: AppsService,
  ) {}

  async getChannels(userId: number, appId: number) {
    const app = await this.appsService.getApp(userId, appId);
    return app.channels;
  }
  async createChannel(userId: number, appId: number, channelData: ChannelDto) {
    const app = await this.appsService.getApp(userId, appId);

    let channel = new Channel();
    channel.name = channelData.name;
    channel.stringId = RandToken.uid(32);

    channel = await this.channelRepository.save(channel);

    return (await this.appsService.addChannel(app, channel)).toResponseObject();
  }
}
