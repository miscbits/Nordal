'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: Sequelize.STRING,
      cell_number: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      github_id: {
        type: Sequelize.INTEGER,
        unique: true
      },
      github_username: {
        type: Sequelize.STRING,
        unique: true
      },
      section: Sequelize.STRING,
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('students');
  }
};