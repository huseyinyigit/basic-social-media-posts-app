import {Injectable} from '@nestjs/common';
import {BaseService} from "../common/base.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Follow} from "./follow.entity";
import {UserService} from "../user/user.service";

@Injectable()
export class FollowService extends BaseService<Follow> {

    constructor(
        @InjectRepository(Follow) repo,
        private userService: UserService
    ) {
        super(repo);
    }

    async save(data: any): Promise<Follow> {
        const follow: Follow | any = {
            follower: await this.userService.findOne(data.follower_id),
            following: await this.userService.findOne(data.following_id)
        };

        console.log(follow);

        return super.save(follow);
    }
}
