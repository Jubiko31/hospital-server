module.exports = (connect, DataTypes) => {
  const Doctor = connect.define('doctors', {
    id: {
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
