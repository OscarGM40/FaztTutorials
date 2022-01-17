

import { GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql";
import { Users } from "../../entities/User";
import { UserType } from "../customTypes/User";
import bcrypt from "bcryptjs";
import { MessageType } from "../customTypes/Message";

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
  async resolve(parent: any, args: any) {
    const { name, email, password } = args;
    const salt = bcrypt.genSaltSync(10);
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
  async resolve(_: any, { id }: any) {
    const result = await Users.delete(id);
    // console.log(result);
    if (result.affected === 1) {
      return true;
    } else {
      return false;
    }
  }
}

export const UPDATE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
    campos:{
      type: new GraphQLInputObjectType({
        name: 'campos',
        fields: {
          name: { type: GraphQLString },
          email: { type: GraphQLString },
          oldPassword: { type: GraphQLString },
          newPassword: { type: GraphQLString } 
        }
      })
    }
    /* name: { type: GraphQLString },
    email: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString } */
  },
  async resolve(_: any, {campos:input,id}: any) {

    /* habria que comparar las passwords */
    const userFound = await Users.findOne(id);

    if (!userFound) {
      return {
        success: false,
        message: "User not found"
      }
    }
    const isMatch = bcrypt.compareSync(input.oldPassword, userFound.password);//normal-hashed

    /* si no coinciden no tiene autorización */
    if (!isMatch) {
      return {
        success: false,
        message: "Las contraseñas no coinciden"
      };
    }

    /* si coinciden puede cambiar su password,luego encripto su nueva password*/
    const encryptedPassword = bcrypt.hashSync(input.newPassword, bcrypt.genSaltSync(10));

    const result = await Users.update({ id }, { 
      name: input.name,
      email: input.email,
      password: encryptedPassword 
    });
    console.log(result);
    if (result.affected === 1) {
      return {
        success: true,
        message: "Usuario actualizado"
      };
    } else {
      return {
        success: false,
        message: "No se pudo actualizar el usuario"
      };
    }


  }
}