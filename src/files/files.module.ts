import { Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { File } from "~/files/file.entity";
import { ConfigModule } from "~/config/config.module";

@Module({
  imports: [TypeOrmModule.forFeature([File]), ConfigModule],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
