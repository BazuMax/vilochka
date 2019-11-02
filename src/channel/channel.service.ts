import {
  Injectable,
  UnauthorizedException,
  Logger,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
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

  async getChannels(userId: number, appSlug: string) {
    const app = await this.appsService.getAppBySlug(userId, appSlug);
    return app.channels;
  }
  async createChannel(
    userId: number,
    appSlug: string,
    channelData: ChannelDto,
  ) {
    const app = await this.appsService.getAppBySlug(userId, appSlug);

    if (
      app.channels.findIndex(
        appChannel => appChannel.name === channelData.name,
      ) !== -1
    ) {
      throw new HttpException("same app name exists", HttpStatus.CONFLICT);
    }

    let channel = new Channel();
    channel.name = channelData.name;
    channel.stringId = RandToken.uid(32);

    channel = await this.channelRepository.save(channel);

    return (await this.appsService.addChannel(app, channel)).toResponseObject();
  }
}
