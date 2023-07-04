module.exports = isAuthorized = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .json({ err: 'You are not authorized', status: 'error' });
  }

  const token = authorization.replace('Bearer ', '');
  if (!token) {
    return res
      .status(401)
      .json({ err: 'You are not authorized', status: 'error' });
  }

  if (token !== '1234567890') {
    return res
      .status(401)
      .json({ err: 'You are not authorized', status: 'error' });
  }

  return next();
};
