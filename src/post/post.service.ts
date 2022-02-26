import {Injectable} from '@nestjs/common';
import {Post} from "./post.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {BaseService} from "../common/base.service";
import {getManager} from "typeorm";
import {PostDTO} from "./post.dto";
import {UserDTO} from "../user/user.dto";
import {UserService} from "../user/user.service";
import {PostMergeDTO} from "./post.merge.dto";

@Injectable()
export class PostService extends BaseService<Post> {

    constructor(
        @InjectRepository(Post) repo,
        private userService: UserService
    ) {
        super(repo);
    }

    async getPosts(userId: number, postIds: number[]): Promise<PostDTO[]> {
        // post ids liked by the user
        const userLikedPostIds: number[] = await this.getPostIdsByUserLiked(userId, postIds);

        // get all post by postIds
        const postMap = await this.getPostMap(postIds, userLikedPostIds);

        const posts: PostDTO[] = Object.values(postMap);
        let postOwnersIds = [...new Set(
            posts
            .filter(post => post !== null)
            .map(post => post.owner)
        )];
        if (postOwnersIds.length < 1)
            return posts;

        // user ids of followed user
        const followedUserIds: number[] = await this.getFollowedUserIds(userId, postOwnersIds);

        // owner users of posts
        const postOwners: { [key: number]: UserDTO } = await this.getPostOwners(postOwnersIds, followedUserIds);
        posts
            .filter(post => post !== null)
            .forEach(post => {
                post.owner = postOwners[post.owner];
            });

        return posts;
    }

    // post ids, liked by the user
    getPostIdsByUserLiked = async (userId: number, postIds: number[]): Promise<number[]> => {
        const man = getManager();
        const query = `
            SELECT
                post_id
            FROM "like"
            WHERE user_id = ${userId}
            AND post_id IN (${postIds})
        `;

        try {
            const results: any[] = await man.query(query);
            const ids: number[] = [];
            for (let result of results)
                ids.push(result.post_id);

            return ids;
        } catch (e) {
            throw e;
        }
    }

    // user ids of followed user
    getFollowedUserIds = async (userId: number, postUserIds: number[]): Promise<number[]> => {
        const man = getManager();
        const query = `
            SELECT
                following_id
            FROM "follow"
            WHERE follower_id = ${userId}
            AND following_id IN (${postUserIds})
        `;

        try {
            const results: any[] = await man.query(query);
            const ids: number[] = [];
            for (let result of results)
                ids.push(result.following_id);

            return ids;
        } catch (e) {
            throw e;
        }
    }

    // posts content
    getPostMap = async (postIds: number[], userLikedPostIds: number[]): Promise<{ [key: number]: PostDTO }> => {
        const man = getManager();
        const query = `
            SELECT
                id,
                description,
                image,
                user_id,
                created_at
            FROM "post"
            WHERE id IN (${postIds})
        `;

        const postMap: { [key: number]: PostDTO } = {};
        for (let postId of postIds)
            postMap[postId] = null;

        const results: any[] = await man.query(query);
        for (let result of results) {
            const postId = result.id;

            postMap[postId] = {
                id: postId,
                description: result.description,
                image: result.image,
                owner: result.user_id,
                created_at: result.created_at,
                liked: userLikedPostIds?.includes(postId)
            };
        }

        return postMap;
    }

    // user content
    getPostOwners = async (postOwnerIds: number[], followedUserIds: number[]): Promise<{ [key: number]: UserDTO }> => {
        const man = getManager();
        const query = `
            SELECT
                id,
                username,
                full_name,
                profile_picture
            FROM "user"
            WHERE id IN (${postOwnerIds})
        `;

        const users: { [key: number]: UserDTO } = {};
        const results: any[] = await man.query(query);
        for (let result of results) {
            const id = result.id;

            users[id] = {
                id,
                username: result.username,
                full_name: result.full_name,
                profile_picture: result.profile_picture,
                followed: followedUserIds?.includes(id)
            };
        }

        return users;
    }

    merge = (postList: [PostMergeDTO[]]): PostMergeDTO[]  => {
        const posts:PostMergeDTO[] = [
            ...postList
                .flat()
                .filter((v, i, a)=> a.findIndex(post => (post.id === v.id || post.description === v.description)) === i)
                .sort(function(post1, post2){ return post2.created_at - post1.created_at || post2.id - post1.id })
            ];
        
        return posts;
    }

    async save(data: any): Promise<Post> {
        const post: Post | any = {
            description: data.description,
            image: data.image,
            user: await this.userService.findOne(data.userId)
        };
        return super.save(post);
    }
}
