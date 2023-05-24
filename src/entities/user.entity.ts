import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("abc")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 50 })
    email!: string;

    @Column({ type: "varchar", length: 50 })
    name!: string;

    constructor(user?: Partial<UserEntity>) {
        user && Object.assign(this, user);
    }
}
