const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_URL ||
    `postgresql://postgres:${encodeURIComponent(
      process.env.PASS
    )}@localhost/redbadgeproject`,
  { dialect: "postgres" }
);

sequelize
  .authenticate()
  .then(
    () => console.log("Connected to red badge app data.base."),
    err => console.log(err)
  );

module.exports = sequelize;
