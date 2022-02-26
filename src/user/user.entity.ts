import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany} from 'typeorm';
import {Post} from "../post/post.entity";
import {CoreEntity} from "../common/core.entity";

@Entity({ name: 'user' })
export class User extends CoreEntity {

    @Column({ type: 'varchar', nullable: false })
    username: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    fullName: string;

    @Column({ type: 'varchar', nullable: true })
    profilePicture: string;

    @Column({ type: 'varchar', nullable: true })
    bio: string;

    @OneToMany(() => Post, post => post.user, { lazy: true })
    @JoinColumn()
    posts: Post[];

    @ManyToMany(type => User, user => user.following, { lazy: true })
    @JoinTable({
        name: "follow",
        joinColumn: {
            name: "follower_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "following_id",
            referencedColumnName: "id"
        }
    })
    followers: User[];

    @ManyToMany(type => User, user => user.followers, { lazy: true })
    following: User[];
}
