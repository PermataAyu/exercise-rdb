const router = require('express').Router()

const { Reading, User, Blog } = require('../models')

router.post('/', async ( req, res, next ) => {
  try {
    await User.findByPk(req.body.userId)
    await Blog.findByPk(req.body.blogId)
    const list = await Reading.create({...req.body})
  } catch(err) {
    next(err)
  }
})

module.exports = router