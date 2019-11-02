import {
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  Body,
  UsePipes,
} from "@nestjs/common";
import { ChannelService } from "~/channel/channel.service";
import { AuthGuard } from "@nestjs/passport";
import { User } from "~/users/user.decorator";
import { ChannelDto } from "~/channel/channel.dto";
import { ValidationPipe } from "~/shared/validation.pipe";

@Controller("api/apps/:appId/channels")
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  getChannels(@User("id") userId, @Param("appId") appId) {
    return this.channelService.getChannels(userId, appId);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe())
  createChannel(
    @User("id") userId,
    @Param("appId") appId,
    @Body() channelData: ChannelDto,
  ) {
    return this.channelService.createChannel(userId, appId, channelData);
  }
}
