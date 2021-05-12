'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'production';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  // sequelize = new Sequelize(
  //   'postgres://wasrjnvfbmpvyh:4b2f8e647868ad78f2797ec84f882436c8e0579e66c60473d864ceddd587be19@ec2-52-21-153-207.compute-1.amazonaws.com:5432/dce3q3fa33o8kn'
  // );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
    // 'postgres://wasrjnvfbmpvyh:4b2f8e647868ad78f2797ec84f882436c8e0579e66c60473d864ceddd587be19@ec2-52-21-153-207.compute-1.amazonaws.com:5432/dce3q3fa33o8kn'
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
