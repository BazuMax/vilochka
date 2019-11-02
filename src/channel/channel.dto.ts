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