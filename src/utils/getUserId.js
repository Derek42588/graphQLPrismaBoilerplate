import jwt from 'jsonwebtoken'


export const getUserId = (request, requireAuth = true, isSubscription = false) => {

    let header

    if (!isSubscription){
        header = request.request.headers.authorization

    } else {
        header = request.connection.context.Authorization
    }

    if (header) {
        const token = header.replace('Bearer ', '')

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
        return decoded.userId
    }

    if(requireAuth) {

    throw new Error('Authentication required!')
    }
  
    return null
}

