import * as bcrypt from 'bcryptjs';
import * as yup from 'yup';
import { ResolverMap } from '../../types/graphql-utils';
import { GQL } from '../../types/schema';
import { User } from '../../entity/User';

const schema = yup.object().shape({
  email: yup
    .string()
    .min(3)
    .max(255)
    .email(),
  password: yup
    .string()
    .min(3)
    .max(255)
});

export const resolvers: ResolverMap = {
  Query: {
    bye: () => 'bye'
  },

  Mutation: {
    register: async (_, args: GQL.IRegisterOnMutationArguments) => {
      try {
        await schema.validate(args, { abortEarly: false });
      } catch (err) {
        console.log(err);
      }

      const { email, password } = args;
      const userAlreadyExists = await User.findOne({
        where: { email },
        select: ['id']
      });

      if (userAlreadyExists) {
        return [{ path: 'email', message: 'already taken' }];
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = User.create({
        email,
        password: hashedPassword
      });

      await user.save();
      return null;
    }
  }
};
