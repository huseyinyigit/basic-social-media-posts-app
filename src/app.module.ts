import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import typeORMConfig from "./config/db-config";
import {UserController} from './user/user.controller';
import {PostController} from './post/post.controller';
import {PostService} from './post/post.service';
import {UserService} from './user/user.service';
import {Post} from "./post/post.entity";
import {User} from "./user/user.entity";
import {LikeService} from './like/like.service';
import {LikeController} from './like/like.controller';
import {Like} from "./like/like.entity";
import {FollowController} from './follow/follow.controller';
import {FollowService} from './follow/follow.service';
import {Follow} from "./follow/follow.entity";
import {AppService} from "./app.service";

@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot(typeORMConfig()),
      TypeOrmModule.forFeature([
          Post,
          User,
          Like,
          Follow
      ])
  ],
  controllers: [
      AppController,
      UserController,
      PostController,
      LikeController,
      FollowController
  ],
  providers: [
      AppService,
      PostService,
      UserService,
      LikeService,
      FollowService
  ],
})
export class AppModule {}
