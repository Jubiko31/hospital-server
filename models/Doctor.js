module.exports = (connect, DataTypes) => {
  const Doctor = connect.define('doctor', {
    doctor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    doctorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studyBranch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Doctor;
};
