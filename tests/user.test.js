import 'cross-fetch/polyfill'


import {seedDb, userOne} from './utils/seedDb'
import {getClient} from './utils/getClient'
import { LOGIN, GET_PROFILE, GET_USERS, CREATE_USER } from './utils/operations'
import prisma from '../src/prisma';

const client = getClient()


beforeEach(seedDb)

test('Should create a new user', async () => {

    const variables = {
        data: {
            name: "Dara Continenza",
            email: "daracontinenza@gmail.com",
            password: "PLOphish88"
        }
    }

    const response = await client.mutate({
        mutation: CREATE_USER,
        variables
    })


    const userWasCreated = await prisma.exists.User({
        id: response.data.createUser.user.id
    })

    expect(userWasCreated).toBe(true)

})

test('Should expose public user profiles', async () => {


    const response = await client.query({
        query: GET_USERS
    })

    expect(response.data.users.length).toBe(2)
    expect(response.data.users[0].email).toBe(null)
    expect(response.data.users[0].name).toBe("Derek Pyle")
} )

test('Should not login with bad credentials', async () => {

    const variables = {
        data: {
            email:"denisefournier@gmail.com",
            password:"twatface"
        }
    }

    await expect(client.mutate({
        mutation: LOGIN,
        variables
    })).rejects.toThrow()
    
})

test('Should fail to create user with short password', async () => {

    const variables = {
        data: {
            name: "Dara Continenza",
            email: "daracontinenza@gmail.com",
            password: "bu"
        }
    }

    await expect(client.mutate({
        mutation: CREATE_USER,
        variables
    }))
    .rejects.toThrow()

})

test('Should fetch a user profile (AUTH)', async () => {
    const client = getClient(userOne.jwt)

    const { data } = await client.query({query: GET_PROFILE })

    expect(data.me.id).toBe(userOne.user.id)
    expect(data.me.name).toBe(userOne.user.name)
    expect(data.me.email).toBe(userOne.user.email)
})