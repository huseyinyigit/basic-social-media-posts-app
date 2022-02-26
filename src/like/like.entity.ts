import {Column, Entity, ManyToOne} from 'typeorm';
import {User} from "../user/user.entity";
import {Post} from "../post/post.entity";
import {CoreEntity} from "../common/core.entity";

@Entity({ name: 'like' })
export class Like extends CoreEntity {

    @Column({ nullable: false })
    user_id: number;

    @ManyToOne(() => User, user => user.posts)
    public user!: User;

    @Column({ nullable: false })
    post_id: number;

    @ManyToOne(() => Post, post => post.user)
    public post!: Post;
}
