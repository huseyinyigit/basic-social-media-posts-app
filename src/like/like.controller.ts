import {Controller} from '@nestjs/common';
import {BaseController} from "../common/base.controller";
import {LikeService} from "./like.service";
import {Like} from "./like.entity";

@Controller('like')
export class LikeController extends BaseController<Like> {

    constructor(public service: LikeService) {
        super(service);
    }
}
