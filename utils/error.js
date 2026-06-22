const errorHandler = (err, req, res, next) => {
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({error: ['email already used']})
  } else if (err.message === 'Validation error: Validation max on year failed') {
    return res.status(400).json({error: ['years invalid']})
  } else if (err.message === 'Validation isEmail on username failed') {
    return res.status(400).json({error: ['username must be email']})
  } else if (err.message === 'insert or update on table "readings" violates foreign key constraint "readings_user_id_fkey"') {
    return res.status(400).json({error: ['user or blog not found']})
  } else {
    console.log(err)
    return res.status(400).json({error: ['unknown error']})
  }

  next(err)
}

module.exports = {
  errorHandler
}