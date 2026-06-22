const router = require('express').Router()

const {User, Blog} = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog
      } 
    ],
    attributes: {exclude: ['createdAt', 'updatedAt', 'password']}
  }) 
  res.json(users)
})

router.get('/:id', async (req, res) => {
  console.log(req.query.read)
  const where = req.query.read
    ? {
      read: req.query.read
    }
    : {}
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        as: 'readings',
        attributes: {exclude: ['createdAt', 'updatedAt', 'userId']},
        through: {
          as: 'reading_list',
          attributes: ['read', 'id'],
          where
        }
      }
    ],
    attributes: {exclude: ['createdAt', 'updatedAt', 'password', 'id']}
  })
  res.json(user)
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create({...req.body})
    return res.json(user)
  } catch(err) {
    return next(err)
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({where: {username: req.params.username}})
  if (user) {
    user.name = req.body.name
    await user.save()
  } else {
    res.send(404).end()
  }
})

module.exports = router
