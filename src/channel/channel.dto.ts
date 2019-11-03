import { IsNotEmpty } from "class-validator";
import { AppRO } from "~/apps/app.dto";

export class ChannelDto {
  @IsNotEmpty()
  name: string;
}

export class ChannelRO {
  stringId: string;
  name: string;
}

export class ChannelRequestDto {
  appSlug: string;
  stringId: string;
}

export class UploadVersionDto extends ChannelRequestDto {
  version: string;
  platform: string;
  arch: string;
}
