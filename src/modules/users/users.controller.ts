import {findUsers} from "./users.service";


export async function getUsersHandler() {
    const users = await findUsers();

    return users;
}
