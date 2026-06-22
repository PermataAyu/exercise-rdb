const router = require('express').Router()

const { Reading, User, Blog } = require('../models')
const {tokenExtractor} = require('../utils/middleware')


router.post('/', async ( req, res, next ) => {
  try {
    await User.findByPk(req.body.userId)
    await Blog.findByPk(req.body.blogId)
    const list = await Reading.create({...req.body})
  } catch(err) {
    next(err)
  }
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    if (req.decodedToken && req.decodedToken.id === list.userId) {
      const list = await Reading.findByPk(req.params.id)
      list.read = req.body.read
      list.save()
      res.json(list)
    } else {
      res.status(401).json({error: 'Unauthorized'})
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router