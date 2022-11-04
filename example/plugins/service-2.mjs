import fp from 'fastify-plugin'
import createFederationService from '../createFederationService.mjs'

const users = {
  u1: {
    id: 'u1',
    name: 'John'
  },
  u2: {
    id: 'u2',
    name: 'Jane'
  },
  u3: {
    id: 'u3',
    name: 'Jack'
  }
}

export default fp(
  async fastify => {
    const schema = `
    #graphql
    extend type Query {
      me: User
      you: User
      hello: String
    }

    type Subscription @extends{ 
      newUserAdded: User
    }

    type User @key(fields: "id") @deprecated @test {
      id: ID!
      name: String!
      fullName: String
      avatar(size: AvatarSize): String
      friends: [User]
    }

    enum AvatarSize {
      small
      medium
      large
    }
`

    const resolvers = {
      Query: {
        me: () => {
          return users.u1
        },
        you: () => {
          throw new Error("Can't fetch other users data, NOT_ALLOWED")
        },
        hello: () => 'world'
      },
      Subscription: {
        newUserAdded: {
          subscribe: async (_root, _args, { pubsub }) =>
            await pubsub.subscribe('USER_ADDED')
        }
      },
      User: {
        __resolveReference: user => {
          return users[user.id]
        },
        avatar: (user, { size }) => `avatar-${size}.jpg`,
        friends: user => Object.values(users).filter(u => u.id !== user.id),
        fullName: user => user.name + ' Doe'
      }
    }

    fastify.log.info('Initializing Service 2 on port 4001')
    await createFederationService('Service 2', schema, resolvers, 4001)
    fastify.log.info('started Service 2 on port 4001')
  },
  {
    name: 'service-2',
    dependencies: []
  }
)
