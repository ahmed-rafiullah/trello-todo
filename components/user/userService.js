const bcrypt = require('bcrypt')
const {
    AppError
} = require('../utilities')

class UserService {

    // pass the user model
    constructor(UserModel) {
        this.UserModel = UserModel
    }

    async registerUser(user) {

        // add additional logging statements that run only during devlopment 
        // use winston logger with a development level

        // always throw the error we dont handle that here at all
        const password = await bcrypt.hash(user.password, 10)
        const emailExists = await this.UserModel.query().select('email').where('email', user.email).limit(1)
        if (emailExists.length > 0) {
            throw new AppError('email already exists', 400)
        } else {
            user.password = password
            const result = await this.User.query().insert(user)
            return result
        }
    }

    async changePassword(user) {

    }


    async loginUser(user) {

    }


}


module.exports = UserService