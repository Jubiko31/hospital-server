const { User, Receptions, Doctor } = require('../models');

exports.getVisitsByUserId = async (req, res) => {
  const id = req.user;
  try {
    const allVisitsByUser = await Receptions.findAll({
      where: { userId: id },
      include: [
        {
          model: User,
          attributes: ['fullName'],
          right: true,
        },
        {
          model: Doctor,
          attributes: ['doctorName'],
        },
      ],
      attributes: { exclude: ['userId', 'doctorId'] },
    });
    if (allVisitsByUser) {
      return res.status(200).send({ allVisitsByUser });
    }
    return res.status(404).send({ answer: `Invalid ${id}.` });
  } catch (error) {
    return res.status(422).send({ answer: error.message });
  }
};
