module.exports = (sequelize, DataTypes) => {
  const Coordinate = sequelize.define("coordinate", {
    entryId: {
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
};
