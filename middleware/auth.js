const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    if (!token) {
      res.status(401).send({ answer: 'Invalid token.' });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const { id: userID } = decodedToken;
    req.user = userID;
    next();
  } catch (err) {
    res.status(401).send({ answer: err.message });
  }
};
