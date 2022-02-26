import {Controller} from '@nestjs/common';
import {BaseController} from "../common/base.controller";
import {Follow} from "./follow.entity";
import {FollowService} from "./follow.service";

@Controller('follow')
export class FollowController extends BaseController<Follow> {

    constructor(public service: FollowService) {
        super(service);
    }
}
