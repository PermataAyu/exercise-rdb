const router = require('express').Router()
const jwt = require('jsonwebtoken')
const {SECRET} = require('../utils/config')

const {Blog, User} = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  req.decodedToken = jwt.verify(authorization.substring(7), SECRET)

  next()
}

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id})
    return res.json(blog)
  } catch(err) {
    next(err)
  }
})

router.put('/:id', async (req,res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    blog.likes = req.body.likes
    await blog.save()
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', async (req,res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    await blog.destroy()
    res.status(204).end()
  } else {
    res.status(404).send()
  }
})

module.exports = router