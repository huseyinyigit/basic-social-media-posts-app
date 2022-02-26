import {Body, Controller, Get, Param, ParseArrayPipe, Post} from '@nestjs/common';
import {PostService} from "./post.service";
import {Post as PostEntity} from "./post.entity";
import {BaseController} from "../common/base.controller";
import {PostDTO} from "./post.dto";
import {PostMergeDTO} from "./post.merge.dto";

@Controller('post')
export class PostController extends BaseController<PostEntity> {

    constructor(public service: PostService) {
        super(service);
    }

    @Get("/:userId/:postIds")
    public getPosts(
        @Param("userId") userId: number,
        @Param("postIds", new ParseArrayPipe({ items: Number, separator: ',' })) postIds: number[]
    ): Promise<PostDTO[]> {
        console.log("userId", userId);
        console.log("postIds", postIds);
        return this.service.getPosts(userId, postIds);
    }

    @Post("/merge")
    public merge(
        @Body() data: [PostMergeDTO[]]
    ): PostMergeDTO[] {
        return this.service.merge(data);
    }
}
