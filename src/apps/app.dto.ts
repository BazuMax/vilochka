import { IsNotEmpty, IsOptional } from "class-validator";

export class AppDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  slug: string;
  @IsOptional()
  token: string;
}

export class AppRO {
  id: number;
  title: string;
  slug: string;
  token: string;
}
