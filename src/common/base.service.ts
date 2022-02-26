import {DeleteResult, FindManyOptions, InsertResult, Repository, UpdateResult} from "typeorm";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";

export abstract class BaseService<E> {

    protected constructor(
        protected repo: Repository<E>
    ) {
    }

    async findOne(id: any, options?: FindOneOptions): Promise<E> {
        options = options || {};
        Object.assign(options, { where: { id } });

        return await this.repo.findOne(options);
    }

    async findAll(options?: FindManyOptions): Promise<E[]> {
        return await this.repo.find(options);
    }

    async save(data: E): Promise<E> {
        return await this.repo.save(data);
    }

    async create(data: any): Promise<InsertResult> {
        return await this.repo.insert(data);
    }

    async update(id: any, data: any): Promise<UpdateResult> {
        return await this.repo.update(id, data);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.repo.delete(id);
    }
}

