import {BaseEntity, CreateDateColumn, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {User} from "../user/user.entity";

@Entity({ name: 'follow' })
export class Follow extends BaseEntity {

    @JoinColumn({ name: "follower_id" })
    @ManyToOne(type => User, user => user.followers, { primary: true })
    follower: User;

    @JoinColumn({ name: "following_id" })
    @ManyToOne(type => User, user => user.following, { primary: true })
    following: User;

    @CreateDateColumn()
    createdAt: Date;
}
