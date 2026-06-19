const router = require('express').Router()
const jwt = require('jsonwebtoken')
const {SECRET} = require('../utils/config')

const {Blog, User} = require('../models')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
  const where = req.query.search 
    ? {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.query.search}%`
          }
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search}%`
          }
        }
      ]
    }
    : {}
  const blogs = await Blog.findAll({
    include: {
      model: User
    },
    where
  })
  res.json(blogs)
})

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
  } 

  next()
}

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = req.decodedToken 
      ? await User.findByPk(req.decodedToken.id) 
      : null
    const blog = user 
      ? await Blog.create({...req.body, userId: user.id}) 
      : await Blog.create({...req.body})
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

router.delete('/:id', tokenExtractor, async (req,res) => {
  const blog = await Blog.findByPk(req.params.id)
  const user = req.decodedToken 
    ? await User.findByPk(req.decodedToken.id)
    : null
  if (blog) {
    if (user && blog.userId === user.id) {
      await blog.destroy()
      res.status(204).end()
    } else {
      res.status(401).json({error: 'Unauthorized'})
    }
  } else {
    res.status(404).end()
  }
})

module.exports = router