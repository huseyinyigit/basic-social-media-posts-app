import { Injectable } from '@nestjs/common';
import {BaseService} from "../common/base.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Like} from "./like.entity";

@Injectable()
export class LikeService extends BaseService<Like> {

    constructor(
        @InjectRepository(Like) repo
    ) {
        super(repo);
    }
}
