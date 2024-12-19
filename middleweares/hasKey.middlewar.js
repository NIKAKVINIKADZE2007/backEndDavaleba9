const hasKeyMiddlewear = (req, res, next) => {
  const headers = req.headers;
  if (!headers.key || headers.key !== 'allowed')
    return res.status(400).json({
      message: 'not allowed to delete with out key',
    });

  next();
};

module.exports = hasKeyMiddlewear;
