import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Channel } from "~/channel/channel.entity";
import { Repository } from "typeorm";
import { AppsService } from "~/apps/apps.service";
import { ChannelDto } from "~/channel/channel.dto";

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

    const channel = new Channel();
    channel.name = channelData.name;


    app.channels.push();
  }
}
