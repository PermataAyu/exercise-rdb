const Blog = require('./blog')
const User = require('./user')
const Reading = require('./reading')
const Session = require('./session')

User.hasMany(Blog)
User.hasMany(Session)
Blog.belongsTo(User)
Session.belongsTo(User)

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
  Reading,
  Session
}