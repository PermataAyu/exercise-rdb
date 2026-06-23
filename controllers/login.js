// const jwt = require('jsonwebtoken')
const crypto = require('node:crypto')
const router = require('express').Router()

const {SECRET} = require('../utils/config')
const {User, Session} = require('../models')

router.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({where: {username: body.username}})
  console.log(user.id)

  const passwordCheck = body.password === user.password

  if (!user && passwordCheck) {
    return res.status(401).json({error: 'invalid username or password'})
  }

  /* const userForToken = {
    username: user.username,
    id: user.id
  } */

  //const token = jwt.sign(userForToken, SECRET)
  const token = crypto.randomBytes(10).toString('hex')
  await Session.create({token, userId: user.id})

  res.status(200).send({token: token, username: user.username, name: user.name})
})

module.exports = router