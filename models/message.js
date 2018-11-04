module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("message", {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(524000),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("new", "read", "replied")
    }
  });
  return Message;
};
