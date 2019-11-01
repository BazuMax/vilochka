import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindOneOptions } from "typeorm";
import { User } from "./user.entity";
import { UserDto, UserRO } from "./user.dto";
import { AppDto } from "~/apps/app.dto";
import { App } from "~/apps/app.entity";
import RandToken from "rand-token";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(data: UserDto): Promise<UserRO> {
    const { username, password } = data;
    let user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);

    await this.userRepository.save(user);

    return user.toResponseObject();
  }

  async authenticate(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        "Invalid username/password",
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  async findOne(options: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOne(options);
    if (!user) {
      throw new HttpException("Not Found", HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async destroy(userId) {
    return this.userRepository.delete(userId);
  }
}
