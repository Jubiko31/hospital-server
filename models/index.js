const { connect, Sequelize: DataTypes } = require('../config/db');
const User = require('./User')(connect, DataTypes);
const Doctor = require('./Doctor')(connect, DataTypes);
const Receptions = require('./Receptions')(connect, DataTypes);

User.hasMany(Receptions, { foreignKey: 'id' });
Receptions.belongsTo(User, { foreignKey: 'id' });

Receptions.belongsTo(Doctor, { foreignKey: 'doctorId' });

module.exports = { User, Doctor, Receptions };
