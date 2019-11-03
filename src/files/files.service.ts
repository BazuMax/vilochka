import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import fs from "fs-extra";
import { join } from "path";
import { UploadVersionDto } from "~/channel/channel.dto";
import { File } from "~/files/file.entity";
import { generateSHAs } from "~/files/utils/sha";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class FilesService implements OnModuleInit {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  onModuleInit() {
    Logger.log(".files");
    if (fs.existsSync(join(__dirname, "../../.files")) === false) {
      fs.mkdirSync(join(__dirname, "../../.files"));
    }
  }

  async uploadFiles(info: UploadVersionDto, filesInfo: Express.Multer.File[]) {
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
