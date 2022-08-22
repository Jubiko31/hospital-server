const { User, Receptions, Doctor } = require('../models');
const { valiDate } = require('../validation');

exports.addNewReception = async (req, res) => {
  const { body } = req;
  const id = req.user;
  const {
    patientName, rdate, complaint, doctorId,
  } = body;

  if (!body) {
    return res.status(401).send({ answer: 'No input.' });
  }
  if (!patientName.trim() || !rdate || !valiDate(rdate) || !complaint.trim() || !doctorId || typeof doctorId !== 'number' || doctorId < 0) {
    return res.status(422).send({ answer: 'All fields are required. Invalid inputs.' });
  }

  try {
    body.id = id;
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

exports.getVisitsByUserId = async (req, res) => {
  const id = req.user;
  try {
    const allVisitsByUser = await Receptions.findAll({
      where: { id },
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
      attributes: { exclude: ['id', 'doctorId'] },
    });
    if (allVisitsByUser) {
      return res.status(200).send({ allVisitsByUser });
    }
    return res.status(404).send({ answer: `Invalid ${id}.` });
  } catch (error) {
    return res.status(422).send({ answer: error.message });
  }
};

exports.deleteReception = async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Receptions.destroy({ where: { recpId: id } });
    if (removed) {
      return res.status(200).send(await this.getVisitsByUserId(req, res));
    }

    return res.status(422).send({ answer: 'Cannot delete, row not found.' });
  } catch (error) {
    return res.status(422).send({ answer: error.message });
  }
};

exports.editReception = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const {
    patientName, doctorId, rdate, complaint,
  } = body;
  const errors = [];
  const editValidInputs = {};

  if (id) {
    if (!patientName && doctorId && rdate && complaint) {
      return res.status(422).send({ answer: 'At least one input should be defined!.' });
    }
    if (patientName) {
      if (!patientName.trim()) errors.push('Name cannot be empty.');
      else editValidInputs.patientName = patientName.trim();
    }
    if (doctorId) {
      if (!doctorId || typeof doctorId !== 'number' || doctorId < 0) errors.push('Doctor ID should be a positive number.');
      else editValidInputs.doctorId = doctorId;
    }
    if (complaint) {
      if (!complaint.trim()) errors.push('No input.');
      else editValidInputs.complaint = complaint;
    }
    if (rdate) {
      if (!rdate || !valiDate(rdate)) errors.push('Invalid date format');
      else editValidInputs.rdate = rdate;
    }
  } else {
    return res.status(404).send({ answer: 'row not found.' });
  }

  if (errors.length) {
    return res.send({ answer: errors });
  }

  try {
    const [edited] = await Receptions.update(editValidInputs, {
      where: { recpId: id },
    });
    if (edited) {
      return await this.getVisitsByUserId(req, res);
    }
    return res.status(422).send({ asnwer: 'Invalid id.' });
  } catch (err) {
    return res.status(422).send({ asnwer: err.message });
  }
};
