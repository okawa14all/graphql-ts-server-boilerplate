//import * as bcrypt from 'bcryptjs';
import { ResolverMap } from '../../types/graphql-utils';
//import { GQL } from '../../types/schema';
//import { User } from '../../entity/User';

export const resolvers: ResolverMap = {
  Query: {
    bye2: () => 'bye'
  },

  Mutation: {
    login: async (
      _,
      //args: GQL.IRegisterOnMutationArguments,
      //{ redis, url }
    ) => {
      return null;
    }
  }
};
