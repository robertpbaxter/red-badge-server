module.exports = (sequelize, DataTypes) => {
  const Coords = sequelize.define("coords", {
    housingId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });
  return Coords;
};
