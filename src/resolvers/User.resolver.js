import { getUserId } from '../utils/getUserId'

export const User = {
    email: {
        fragment: 'fragment userId on User { id }',
        resolve: (parent, args, {request}, info ) => {
            const userId = getUserId(request, false)
    
            if (userId && parent.id === userId) {
                return parent.email
            } else {
                return null
            }
        }
    },
    password: {
        fragment: 'fragment userId on User { id }',
        resolve: (parent, args, {request}, info ) => {
            const userId = getUserId(request, false)
    
            if (userId && parent.id === userId) {
                return parent.password
            } else {
                return null
            }
        }
    },
};
