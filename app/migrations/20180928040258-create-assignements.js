'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('assignments', {
      student_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      lab_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
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
    return queryInterface.dropTable('assignments');
  }
};