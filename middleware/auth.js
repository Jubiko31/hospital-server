const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
      res.status(401).send({ answer: 'Invalid token.' });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const { id: userID } = decodedToken;
    req.user = userID;
    return next();
  } catch (err) {
    return res.status(401).send({ answer: err.message });
  }
};
