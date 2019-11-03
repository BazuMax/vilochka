import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  platform: string;

  @Column()
  arch: string;

  @Column()
  sha1: string;

  @Column()
  sha256: string;

  @Column()
  originalName: string;
}
