module.exports = (sequelize, DataTypes) => {
  const Housing = sequelize.define("housing", {
    residenceType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bathrooms: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    petsAllowed: {
      type: DataTypes.STRING,
      allowNull: true
    },
    facilities: {
      type: DataTypes.STRING(524000),
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Housing;
};
