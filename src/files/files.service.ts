import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import fs from "fs-extra";
import { join } from "path";
import { UploadVersionDto } from "~/channel/channel.dto";
import { File } from "~/files/file.entity";
import { generateSHAs } from "~/files/utils/sha";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "~/config/config.service";
import multer from "multer";
import util from "util";
import { Request, Response } from "express";

@Injectable()
export class FilesService implements OnModuleInit {
  upload: (req: Request, resp: Response) => Promise<void>;
  filesRoot: string = "";

  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    private configService: ConfigService,
  ) {}

  onModuleInit() {
    this.filesRoot = this.configService.filesRoot;
    if (fs.existsSync(this.filesRoot) === false) {
      fs.mkdirSync(this.filesRoot);
    }

    this.upload = util.promisify(
      multer({
        dest: this.filesRoot,
      }).any(),
    );
  }

  async uploadFiles(req: Request, resp: Response) {
    await this.upload(req, resp);
  }

  async uploadFileInfos(
    info: UploadVersionDto,
    filesInfo: Express.Multer.File[],
  ) {
    Logger.log(info);
    const files: File[] = [];

    for (const fileInfo of filesInfo) {
      const file = new File();
      file.platform = info.platform;
      file.arch = info.arch;
      const fileBuffer = await fs.readFile(fileInfo.path);
      const shaKeys = generateSHAs(fileBuffer);
      file.sha1 = shaKeys.sha1;
      file.sha256 = shaKeys.sha256;
      file.fileName = fileInfo.filename;
      file.originalName = fileInfo.originalname;

      files.push(file);
    }

    this.fileRepository.save(files);
  }
}
