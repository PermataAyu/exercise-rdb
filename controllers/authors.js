const router = require('express').Router()

const { Blog } = require('../models')
const { sequelize } = require('../utils/db')

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      attributes: [
        'author', 
        [sequelize.fn('COUNT', sequelize.col('title')), 'blogs'], 
        [sequelize.fn('SUM', sequelize.col('likes')), 'likes']],
      group: 'author'
    })
    return res.json(blogs)
  } catch(err) {
    console.log(err)
  }
})

module.exports = router