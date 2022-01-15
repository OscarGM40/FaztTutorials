import { GraphQLID, GraphQLList } from "graphql";
import { Users } from "../../entities/User";
import { UserType } from "../customTypes/User";



export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  async resolve(parent: any, args: any) {
    return await Users.find();
  }
}

export const GET_ONE_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID }
  },
  async resolve(_: any, args: any) {
    return await Users.findOne(args.id);
  }
}