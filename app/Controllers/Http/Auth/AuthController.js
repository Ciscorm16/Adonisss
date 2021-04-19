'use strict'

class AuthController {
    async login ({request, response, auth}){
        const {email, password} = request.only(['email', 'password'])
        const token = await auth.attempt(email, password)
        return response.json(token);
    }

    async logout({auth}){
        return await auth.logout()
    }
}

module.exports = AuthController
