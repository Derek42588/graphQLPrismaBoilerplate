import { getUserId } from '../utils/getUserId';

export const Query = {
  me: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request);

    const user = await prisma.query.user({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error('Unable to find user!');
    }

    return user;
  },
  users: (parent, { query, first, skip, after, orderBy }, { prisma, request }, info) => {

    const opArgs = {
      first,
      skip,
      after,
      orderBy
    };

    if (query) {
      opArgs.where = {
        OR: [
          {
            name_contains: query,
          }
        ],
      };
    }
    
    return prisma.query.users(opArgs, info);
  }
};
