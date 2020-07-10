import bcrypt from 'bcryptjs';

import { getUserId } from '../utils/getUserId';
import { generateToken } from '../utils/generateToken';
import { hashPassword } from '../utils/hashPassword';

export const Mutation = {
  loginUser: async (parent, { data }, { prisma }, info) => {
    const { email, password } = data;

    const user = await prisma.query.user({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error('Unable to login!');
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      throw new Error('Unable to login!');
    }

    return {
      user,
      token: generateToken(user.id),
    };
  },
  createUser: async (parent, { data }, { prisma }, info) => {
    const { email, password } = data;

    const emailTaken = await prisma.exists.User({
      email,
    });

    if (emailTaken) {
      throw new Error('Email is already in use!');
    }

    const hashedPw = await hashPassword(password);

    const user = await prisma.mutation.createUser({
      data: {
        ...data,
        password: hashedPw,
      },
    });

    return {
      user,
      token: generateToken(user.id),
    };
  },
  updateUser: async (parent, { data }, { prisma, request }, info) => {
    const userId = getUserId(request);

    if (typeof data.password === 'string') {
      data.password = await hashPassword(data.password);
    }

    return prisma.mutation.updateUser(
      {
        where: {
          id: userId,
        },
        data,
      },
      info
    );
  },
  deleteUser: async (parent, args, { prisma, request }, info) => {
    //find if user exists
    const userId = getUserId(request);

    return prisma.mutation.deleteUser(
      {
        where: {
          id: userId,
        },
      },
      info
    );
  }
};
