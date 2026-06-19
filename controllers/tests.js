const { User, Blog } = require('../models')

const router = require('express').Router()

router.get('/', async (req, res) => {
  res.status(200).send('responds')
})

router.post('/api/reset', async (req, res) => {
  await Blog.destroy({truncate: true})
  await User.destroy({truncate: true, cascade: true})
  res.status(204).end()
})

module.exports = router