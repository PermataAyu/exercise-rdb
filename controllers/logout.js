const router = require('express').Router()
const Session = require('../models/session')
const {tokenExtractor} = require('../utils/middleware')

router.delete('/', tokenExtractor, async (req, res) => {
  const session = await Session.findOne({where: {token: req.decodedToken.token}})
  await session.destroy()
})

module.exports = router