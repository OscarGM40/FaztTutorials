


import { GraphQLBoolean, GraphQLID, GraphQLString } from "graphql";
import { Users } from "../../entities/User";
import { UserType } from "../customTypes/User";
import  bcrypt from "bcryptjs";

/* cuando ejecute CREATE_USER voy a devolver algun tipo.Ese tipo debe suministrarse en la propiedad type y coincidir con el return del resolver */
export const CREATE_USER = {
  type: UserType,
  /* los argumentos se reciben en la propiedad args */
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  /* si una acción usa args el resolve los va a recibir en la segunda posición */
  async resolve(parent:any, args:any) {
    const { name, email, password } = args;
    const salt =  bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const result = await Users.insert({ name, email, password: hashedPassword });
    console.log(result);

    return {
      id: result.identifiers[0].id,
      ...args,
      password: hashedPassword
      };
  }
}

export const DELETE_USER = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLID }
  },
  async resolve(_: any, {id}: any) {
    const result = await Users.delete(id);
    // console.log(result);
    if(result.affected === 1) {
      return true;
    }else {
      return false;
    }
  }
}