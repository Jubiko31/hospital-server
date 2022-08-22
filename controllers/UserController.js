const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { validateEmail, validatePassword } = require('../validation');

exports.register = async (req, res) => {
  const errors = [];
  try {
    const { body } = req;
    const { fullName, email, password } = req.body;
    if (!(email || password || fullName)) {
      return res.status(422).send('All input is required');
    }
    if (!validateEmail(email)) errors.push('Invalid email format.');
    if (!validatePassword(password)) errors.push('Invalid password format.');

    if (errors.length) {
      return res.status(422).send({ msg: errors });
    }

    const oldUser = await User.findOne({ where: { email } });
    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    body.password = bcrypt.hashSync(password, 10);

    const user = await User.create(body);
    const { id } = user;
    const token = jwt.sign(
      { id, email, password },
      process.env.TOKEN_KEY,
      {
        expiresIn: '12h',
      },
    );

    return res.status(201).json({ id, email, token });
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email || password) || !req.body || req.body === {}) {
      res.status(422).send('Username or password is not defined.');
    }

    const user = await User.findOne({ where: { email } });
    const { id } = user;
    if (user && (await bcrypt.compare(password, user.password))) {
      // create token
      const token = jwt.sign(
        { id, email, password },
        process.env.TOKEN_KEY,
        {
          expiresIn: '12h',
        },
      );

      res.status(200).json({ id, email, token });
    }

    return res.status(422).send('Invalid credentials.');
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};
