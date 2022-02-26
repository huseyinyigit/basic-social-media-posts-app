import {BaseEntity, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';

export class CoreEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;
}
