import {Injectable} from '@nestjs/common';
import {BaseService} from "../common/base.service";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";

@Injectable()
export class UserService extends BaseService<User> {

    constructor(
        @InjectRepository(User) repo
    ) {
        super(repo);
    }
}
