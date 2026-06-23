//const jwt = require('jsonwebtoken')
const { Session } = require('../models')
const {SECRET} = require('./config')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.decodedToken = await Session.findOne({where: {token: authorization.substring(7)}})
    //req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
  } 

  next()
}

module.exports = {tokenExtractor}