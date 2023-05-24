import {DataSource, EntityTarget, ObjectLiteral} from "typeorm";
import {UserEntity} from "../entities/user.entity";
import {BaseRepository} from "./base.repository";

export class UsersRepository extends BaseRepository<UserEntity> {

    constructor(dataSource: DataSource) {
        super(dataSource, UserEntity);
    }

}
