const Blog = require('./blog')
const User = require('./user')
const Reading = require('./reading')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, {through: Reading, as: 'readings'})
Blog.belongsToMany(User, {through: Reading, as: 'reading_users'})
User.hasMany(Reading)
Blog.hasMany(Reading)
Reading.belongsTo(User)
Reading.belongsTo(Blog)

/* User.sync({alter: true})
Blog.sync({alter: true}) */

module.exports = {
  Blog,
  User,
  Reading
}