module.exports = (connect, DataTypes) => {
  const Receptions = connect.define(
    'receptions',
    {
      recpId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      patientName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rdate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      complaint: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false },
  );

  return Receptions;
};
