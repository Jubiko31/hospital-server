const { User, Receptions, Doctor } = require('../models');
const { valiDate, validName, validText } = require('../validation');

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
  const errors = [];

  if (!patientName.trim() || !date || !complaint.trim() || !doctorId) {
    return res.status(422).send({ answer: 'All fields are required.' });
  }
  if (!valiDate(date)) {
    errors.push('invalid date format.');
  }
  if (!validName(patientName)) {
    errors.push('invalid name input.');
  }
  if (validText(complaint)) {
    errors.push('invalid text input.');
  }
  if (typeof doctorId !== 'number' || doctorId < 0) {
    errors.push('doctor id should be a positibe number.');
  }

  if (errors.length) {
    return res.status(422).send({ answer: errors });
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

exports.deleteReception = async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Receptions.destroy({ where: { id } });
    if (removed) {
      return res.status(200).send(await this.getVisitsByUserId(req, res));
    }

    return res.status(422).send({ answer: 'Cannot delete, row not found.' });
  } catch (error) {
    return res.status(422).send({ answer: error.message });
  }
};
