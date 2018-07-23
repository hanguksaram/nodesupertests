const { User} = require('../models/users')

const authenticate = (reqs, resp, next) => {
    const token = reqs.header('x-auth')

    User.findByToken(token).then((user) => {
        if (!user)
            return resp.status(404).send('User dosnt exist')
        reqs.user = {id: user._id, email: user.email}
        reqs.token = token
        next()
    }, (e) => {
        resp.status(401).send(e)
    })
    
}
module.exports = { authenticate }