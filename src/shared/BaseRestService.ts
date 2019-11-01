import { FindOneOptions, Repository } from "typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";

export class BaseRestService<Entity, EntityDto> {
  protected constructor(protected repository: Repository<Entity>) {}

  protected async create_internal(
    data: EntityDto,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity> {
    let entity = await this.repository.create({
      ...data,
    });
    await this.repository.save(entity);

    // @ts-ignore
    entity = await this.findByID(entity.id, options);
    return entity;
  }

  async update_internal(
    id: number,
    data: Partial<EntityDto>,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity> {
    let entity = await this.findByID(id);

    // @ts-ignore
    await this.repository.update({ id }, data);

    // @ts-ignore
    entity = await this.findByID(entity.id, options);
    return entity;
  }

  async delete_internal(id: number): Promise<Entity> {
    const entity = await this.findByID(id);

    // @ts-ignore
    await this.repository.delete({ id });

    return entity;
  }

  async findByID(
    id: number,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity> {
    const entity = await this.repository.findOne({
      where: { id },
      ...options,
    });

    if (!entity) {
      throw new HttpException("Not Found", HttpStatus.BAD_REQUEST);
    }

    return entity;
  }
}
