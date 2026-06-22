const Blog = require('./blog')
const User = require('./user')
const Reading = require('./reading')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, {through: Reading})
Blog.belongsToMany(User, {through: Reading})

/* User.sync({alter: true})
Blog.sync({alter: true}) */

module.exports = {
  Blog,
  User,
  Reading
}