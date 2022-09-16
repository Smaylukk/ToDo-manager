const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

class Auth {
    secretKey = process.env.JWT_SERCRET || 'Secret'

    async login(username, password) {
        const user = await User.findOne({ username })
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                return this.jwtSign(user._id, username)
            } else {
                throw new GraphQLError('Паролі не збігаються')
            }
        } else {
            throw new GraphQLError('Користувача не знайдено')
        }
    }

    async register(username, password) {
        const passHash = bcrypt.hashSync(password, 5)
        const user = await User.create({
            username,
            password: passHash,
        })

        return this.jwtSign(user._id, username)
    }

    async check(context) {
        const { user } = context
        if (user) {
            return this.jwtSign(user.id, user.username)
        } else {
            return null
        }
    }

    jwtSign(id, username) {
        const payload = { id, username }
        const token = jwt.sign(payload, this.secretKey, { expiresIn: '2d' })

        return { token }
    }

    jwtVerify(token) {
        if (token) {
            try {
                return jwt.verify(token, this.secretKey)
            } catch (error) {
                console.error('Помилка верифікації токену')
                return null
            }
        }
        return null
    }
}

module.exports = new Auth()
