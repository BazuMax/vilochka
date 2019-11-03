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
import { ChannelDto, UploadVersionDto } from "~/channel/channel.dto";
import RandToken from "rand-token";
import { Request, Response } from "express";
import { FilesService } from "~/files/files.service";

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>,
    private appsService: AppsService,
    private filesService: FilesService,
  ) {}

  async getChannels(userId: number, appSlug: string) {
    const app = await this.appsService.getAppBySlug(userId, appSlug);
    return app.channels.map(channel => channel.toResponseObject());
  }

  async getApp(userId: number, appSlug: string, channelStringId: string) {
    const app = await this.appsService.getAppBySlug(userId, appSlug);

    if (
      app.channels.findIndex(
        appChannel => appChannel.stringId === channelStringId,
      ) === -1
    ) {
      throw new UnauthorizedException();
    }
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
      throw new HttpException("same channel name exists", HttpStatus.CONFLICT);
    }

    let channel = new Channel();
    channel.name = channelData.name;
    channel.stringId = RandToken.uid(32);

    channel = await this.channelRepository.save(channel);

    return (await this.appsService.addChannel(app, channel)).toResponseObject();
  }

  async deleteChannel(
    userId: number,
    appSlug: string,
    channelStringId: string,
  ) {
    const app = await this.getApp(userId, appSlug, channelStringId);

    await this.channelRepository.delete({ stringId: channelStringId });

    return await this.appsService.getAppBySlug(userId, appSlug);
  }

  async uploadVersion(
    userId: number,
    params: UploadVersionDto,
    req: Request,
    resp: Response,
  ) {
    const app = await this.getApp(userId, params.appSlug, params.stringId);

    await this.filesService.uploadFiles(req, resp);
    // @ts-ignore
    await this.filesService.uploadFileInfos(params, req.files);

    resp.send(req.files);
  }
}
