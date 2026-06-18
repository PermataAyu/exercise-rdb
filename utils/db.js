const { Sequelize } = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres'
})

const connectToDb = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected')
  } catch(err) {
    console.log('failed')
    return process.exit(1)
  }

  return null
}

module.exports = {
  connectToDb, 
  sequelize
}