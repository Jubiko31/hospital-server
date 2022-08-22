/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const { Doctor } = require('../models');

exports.getDoctors = async (req, res) => {
  try {
    const all = await Doctor.findAll();
    return res.json(all);
  } catch (err) {
    return res.status(422).send({ answer: err });
  }
};

exports.addNewDoctor = async (req, res) => {
  const { doctorName, studyBranch } = req.body;
  const { body } = req;
  if ((!doctorName || !studyBranch) || !body) {
    return res.status(422).send({ answer: 'Name or branch input is not defined.' });
  }
  if (!doctorName.trim()) {
    return res.status(200).send({ answer: 'Name cannot be empty!' });
  }
  if (!studyBranch.trim()) {
    return res.status(200).send({ answer: 'Branch cannot be empty!' });
  }

  try {
    const newDoctor = await Doctor.create(body);
    return newDoctor && (await this.getDoctors(req, res));
  } catch (error) {
    return res.status(422).send({ answer: error });
  }
};

exports.removeDoctor = (req, res) => {
  const { doctor_id } = req.params;
  if (!doctor_id.trim()) {
    res.status(422).send({ answer: 'Invalid id.' });
  }

  Doctor.destroy({ where: { doctor_id } })
    .then(async (removed) => {
      if (removed) {
        const all = await Doctor.findAll();
        return res.send(all);
      }
      return res.status(404).send({ answer: 'row not found.' });
    }).catch((err) => res.status(422).send({ answer: err }));
};

exports.editDoctor = async (req, res) => {
  const { doctor_id } = req.params;
  const { doctorName, studyBranch } = req.body;
  const { body } = req;
  const errors = [];
  const valueKeys = {};

  if (!body) {
    return res.status(422).send({ answer: 'Invalid inputs.' });
  }
  if (doctor_id) {
    if (!doctorName && !studyBranch) {
      return res.status(422).send({ answer: 'At least one input should be defined!.' });
    }
    if (studyBranch) {
      if (!studyBranch.trim()) errors.push('Name cannot be empty.');
      else valueKeys.studyBranch = studyBranch;
    }
    if (doctorName) {
      if (!doctorName.trim()) errors.push('Name cannot be empty.');
      else valueKeys.doctorName = doctorName;
    }

    if (errors.length) {
      return res.status(422).send({ answer: errors });
    }

    try {
      const [result] = await Doctor.update(valueKeys, {
        where: { doctor_id },
      });
      if (result === 1) {
        return await this.getDoctors(req, res);
      }
      return res.status(404).send({ answer: 'Instance not found.' });
    } catch (error) {
      return res.status(422).send({ answer: error });
    }
  }
};
