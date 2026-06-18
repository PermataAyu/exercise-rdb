const errorHandler = (err, req, res, next) => {
  console.error(err.name)
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({error: ['email already used']})
  } else if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({error: ['username must be a valid email address']})
  } else {
    return res.status(400).json({error: ['unknown error']})
  }

  next(err)
}

module.exports = {
  errorHandler
}