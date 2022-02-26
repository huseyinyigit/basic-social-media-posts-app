import {Controller} from '@nestjs/common';
import {BaseController} from "../common/base.controller";
import {User} from "./user.entity";
import {UserService} from "./user.service";

@Controller('user')
export class UserController extends BaseController<User> {

    constructor(public service: UserService) {
        super(service);
    }
}
