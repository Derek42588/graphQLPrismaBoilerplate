import { extractFragmentReplacements } from 'prisma-binding'

import { Query } from './Query.resolver';
import { Mutation } from './Mutation.resolver';
import { User } from './User.resolver';
// import { Subscription } from './Subscription.resolver';

const resolvers = {
    Query,
    Mutation,
    User,
    // Subscription,
}

const fragmentReplacements = extractFragmentReplacements(resolvers)

export { resolvers, fragmentReplacements }