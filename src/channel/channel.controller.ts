import {
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  Body,
  UsePipes,
  Delete,
} from "@nestjs/common";
import { ChannelService } from "~/channel/channel.service";
import { AuthGuard } from "@nestjs/passport";
import { User } from "~/users/user.decorator";
import { ChannelDto } from "~/channel/channel.dto";
import { ValidationPipe } from "~/shared/validation.pipe";

@Controller("api/apps/:appSlug/channels")
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  getChannels(@User("id") userId, @Param("appSlug") appSlug) {
    return this.channelService.getChannels(userId, appSlug);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe())
  createChannel(
    @User("id") userId,
    @Param("appSlug") appSlug,
    @Body() channelData: ChannelDto,
  ) {
    return this.channelService.createChannel(userId, appSlug, channelData);
  }

  @Delete(":stringId")
  @UseGuards(AuthGuard("jwt"))
  deleteChannel(
    @User("id") userId,
    @Param("appSlug") appSlug,
    @Param("stringId") stringId,
  ) {
    return this.channelService.deleteChannel(userId, appSlug, stringId);
  }
}
