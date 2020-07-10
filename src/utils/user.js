const getFirstName = (fullName) => {
    return fullName.split(' ')[0]
}

const isValidPassword = (password) => {
    return password.length >= 8
}

export { getFirstName, isValidPassword }