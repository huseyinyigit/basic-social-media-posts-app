import {Column, Entity, ManyToMany, ManyToOne} from 'typeorm';
import {User} from "../user/user.entity";
import {Like} from "../like/like.entity";
import {CoreEntity} from "../common/core.entity";

@Entity({ name: 'post' })
export class Post extends CoreEntity {

    @Column({ type: 'varchar', nullable: false })
    description: string;

    @Column({ type: 'varchar', nullable: false })
    image: string;

    @ManyToOne(() => User, user => user.posts, { eager: true, nullable: false })
    user: User;

    @ManyToMany(() => User, user => user.posts, { lazy: true })
    likes: Like[];
}
