module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define("ticket", {
    type: {
      type: DataTypes.ENUM("report", "support"),
      allowNull: false
    },
    issue: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(524000),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contactId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Ticket;
};
