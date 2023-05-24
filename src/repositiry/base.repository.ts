import {DataSource, EntityTarget, ObjectLiteral} from "typeorm";

export class BaseRepository<Entity extends ObjectLiteral> {
    protected readonly target: EntityTarget<Entity>;

    constructor(protected dataSource: DataSource, _target: EntityTarget<Entity>) {
        this.target = _target;
    }
}
