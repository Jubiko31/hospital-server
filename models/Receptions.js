module.exports = (connect, DataTypes) => {
  const Receptions = connect.define(
    'receptions',
    {
      recp_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userName: {
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
      doctor_id: {
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
