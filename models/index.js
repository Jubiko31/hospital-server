const { connect, Sequelize: DataTypes } = require('../config/db');
const User = require('./User')(connect, DataTypes);
const Doctor = require('./Doctor')(connect, DataTypes);
const Receptions = require('./Receptions')(connect, DataTypes);

Receptions.belongsTo(User, { foreignKey: 'userId' });

Receptions.belongsTo(Doctor, { foreignKey: 'doctorId' });

module.exports = { User, Doctor, Receptions };
