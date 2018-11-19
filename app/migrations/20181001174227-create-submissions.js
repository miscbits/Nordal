'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('submissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pr_url: {
        type: Sequelize.STRING
      },
      submission_url: {
        type: Sequelize.STRING
      },
      submittable: {
        type: Sequelize.STRING
      },
      latest_hash: {
        type: Sequelize.STRING
      },
      student_id: {
        type: Sequelize.INTEGER
      },
      submittable_id: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('submissions');
  }
};