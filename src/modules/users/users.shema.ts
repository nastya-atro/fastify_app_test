import * as TypeBox from "@sinclair/typebox";

export const UserBaseSchema = TypeBox.Type.Object({
    name: TypeBox.Type.String(),
    email: TypeBox.Type.String()
})
export const UsersResponseSchema = TypeBox.Type.Array(
    UserBaseSchema
)
