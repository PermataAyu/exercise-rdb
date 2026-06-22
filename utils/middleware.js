const jwt = require('jsonwebtoken')
const {SECRET} = require('./config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
  } 

  next()
}

module.exports = {tokenExtractor}