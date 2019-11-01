import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { AppDto } from "~/apps/app.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { App } from "~/apps/app.entity";
import { User } from "~/users/user.entity";
import { Repository } from "typeorm";
import RandToken from "rand-token";

@Injectable()
export class AppsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(App)
    private appRepository: Repository<App>,
  ) {}

  async addApp(userId: number, appData: AppDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    let app = new App();
    Object.assign(app, appData, { token: RandToken.uid(32) });
    app = await this.appRepository.manager.save(app);

    user.apps.push(app);

    await this.userRepository.save(user);

    return app;
  }

  async deleteApp(userId: number, appId: number) {
    let user = await this.userRepository.findOne({ where: { id: userId } });
    const appIndex = user.apps.findIndex(app => app.id === appId);
    if (appIndex === -1) {
      throw new HttpException("app not found", HttpStatus.BAD_REQUEST);
    }

    user.apps.splice(appIndex, 1);
    user = await this.userRepository.save(user);

    return user.apps;
  }

  async getApps(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const apps = user.apps;

    return apps;
  }
}
