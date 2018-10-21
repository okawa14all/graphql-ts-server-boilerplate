export const resolvers = {
  Query: {
    hello: (_: any, { name }: any) => `Bye ${name || 'World'}`,
  },
};
