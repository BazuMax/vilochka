import {
  Controller,
  Post,
  UseGuards,
  Body,
  UsePipes,
  Delete,
  Get,
  Param,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AppDto } from "~/apps/app.dto";
import { User } from "~/users/user.decorator";
import { ValidationPipe } from "~/shared/validation.pipe";
import { AppsService } from "~/apps/apps.service";

@Controller("api/apps")
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  getApps(@User("id") userId) {
    return this.appsService.getAppsByUserID(userId);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard("jwt"))
  addApp(@User("id") userId, @Body() appData: AppDto) {
    return this.appsService.addApp(userId, appData);
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  deleteApp(@User("id") userId, @Param("id") id: string) {
    return this.appsService.deleteApp(userId, Number(id));
  }
}
