import {UserEntity} from "../../entities/user.entity";
import * as TypeBox from '@sinclair/typebox';
import {FastifyReply, FastifyRequest} from "fastify";
import {UserBaseSchema, UsersResponseSchema} from "./users.shema";


async function usersRoute(server: any) {
    server.get('/', {
        schema:{
            response:{
                200: UsersResponseSchema
            }
        }
    }, async () => {
        const userRepository = server.orm.getRepository(UserEntity);
        const users = await userRepository.createQueryBuilder('users')
        const results = await users.getMany()
        return results
    });
    server.get('/:id', {
        schema:{
            response:{
                200: UserBaseSchema
            }
        }
    }, async (req: FastifyRequest, reply: FastifyReply) => {
        const {id} = req.params as any
        const userRepository = server.orm.getRepository(UserEntity);
        const users = await userRepository.createQueryBuilder('users').whereInIds([id])
        return await users.getOne()
    });
    server.post('/', {
        schema: {
            body: UserBaseSchema,
            response:{
                200: UserBaseSchema
            }
        }
    }, async (req: FastifyRequest, reply: FastifyReply)=>{
         const body: any = req.body
         const newUser = await server.orm.getRepository(UserEntity).save({
            ...body
        });

        reply.send(newUser)
    });
    server.patch('/:id', {
        schema: {
            body: UserBaseSchema,
            response:{
                200: TypeBox.Type.Object({
                    statusCode: TypeBox.Type.Number(),
                })
            }
        }
    }, async (req: FastifyRequest, reply: FastifyReply)=>{
        const {id} = req.params as any
        const body: any = req.body
        const userRepository = server.orm.getRepository(UserEntity);
        await userRepository.createQueryBuilder().update({
            ...body
        }).whereInIds([id]).execute()
        return { statusCode: 200 }
    });
    server.delete('/:id', {}, async(req: FastifyRequest, reply: FastifyReply)=>{
        const {id} = req.params as any
        await server.orm.getRepository(UserEntity).createQueryBuilder().delete()
            .whereInIds([id]).execute();

        return { statusCode: 204 };
    });
}

export default usersRoute;
