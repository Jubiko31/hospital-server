const { User } = require('../models');

exports.getUsers = async (req, res) => {
  try {
    const all = await User.findAll();
    res.json(all);
  } catch (err) {
    res.status(422).send({ answer: err });
  }
};
