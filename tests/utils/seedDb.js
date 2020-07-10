import prisma from '../../src/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userOne = {
  input: {
    name: 'Derek Pyle',
    email: 'derekpyle@gmail.com',
    password: bcrypt.hashSync('PLOphish88'),
  },
  user: undefined,
  jwt: undefined,
};
const userTwo = {
  input: {
    name: 'Denise Fournier',
    email: 'denisefournier@gmail.com',
    password: bcrypt.hashSync('PLOphish88'),
  },
  user: undefined,
  jwt: undefined,
};


const seedDb = async () => {
  //Delete test data
  await prisma.mutation.deleteManyUsers();

  //create userOne.user
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input,
  });

  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input,
  });

  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);

};

export { seedDb, userOne, userTwo };
