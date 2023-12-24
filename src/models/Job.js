const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Job = sequelize.define(
  'jobs',
  {
    server: DataTypes.STRING,
    name: DataTypes.STRING,
    startedAt: DataTypes.DATE,
    finishedAt: DataTypes.DATE,
    logs: DataTypes.STRING,
  },
  {
    schema: process.env.DB_SCHEMA,
    hooks: {
      beforeSave: function (instance) {
        if (!instance.getDataValue('startedAt')) {
          instance.setDataValue('startedAt', new Date().toISOString());
        }
      },
    },
  }
);

module.exports = Job;
