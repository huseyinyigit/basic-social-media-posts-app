import {Body, Get, Post, Query} from '@nestjs/common';
import {BaseService} from "./base.service";

export class BaseController<E> {

    maxRowPerPage = parseInt(process.env.DB_QUERY_MAX_ROW_PER_PAGE || process.env.DB_QUERY_ROW_PER_PAGE || '20');
    defRowPerPage = parseInt(process.env.DB_QUERY_ROW_PER_PAGE || '20');

    constructor(
        protected service: BaseService<E>
    ) {
    }

    @Post()
    async save(@Body() data: any) {
        return this.service.save(data);
    }

    @Get()
    public findAll(@Query() query): Promise<any[]> {
        return this.service.findAll({
            skip: query.offset * 1 === query.offset && query.offset > 0 ? query.offset : 0,
            take: Number.isInteger(query.limit) && query.limit > 0 && query.limit < this.maxRowPerPage ? query.limit : this.defRowPerPage
        });
    }
}
