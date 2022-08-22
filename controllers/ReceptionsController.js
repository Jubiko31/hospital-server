const { User, Receptions, Doctor } = require('../models');
const { valiDate } = require('../validation');

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

exports.addNewReception = async (req, res) => {
  const { body } = req;
  const id = req.user;
  const {
    patientName, date, complaint, doctorId,
  } = body;

  if (!body) {
    return res.status(422).send({ answer: 'No input.' });
  }
  if (!patientName.trim() || !date || !valiDate(date) || !complaint.trim() || !doctorId || typeof doctorId !== 'number' || doctorId < 0) {
    return res.status(422).send({ answer: 'All fields are required. Invalid inputs.' });
  }

  try {
    body.userId = id;
    const newInstance = await Receptions.create(body, {
      include: User,
    });
    if (newInstance) {
      return res.send(await this.getVisitsByUserId(req, res));
    }

    return res.status(422).send({ answer: 'Cannot add patient try again.' });
  } catch (error) {
    return res.status(422).send({ answer: error.message });
  }
};
