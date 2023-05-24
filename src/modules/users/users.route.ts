import {UserEntity} from "../../entities/user.entity";

async function usersRoute(server: any) {
    server.get('/', {}, async () => {
        const userRepository = server.orm.getRepository(UserEntity);
        const users = await userRepository.createQueryBuilder('users')
        const results = await users.getMany()
        return results
    });
    server.post('/', {}, ()=>{});
    server.patch('/', {}, ()=>{});
    server.delete('/', {}, ()=>{});
}

export default usersRoute;
