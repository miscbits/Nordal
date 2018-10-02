'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Person', [{
            name: 'John Doe',
            isBetaMember: false
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        queryInterface.bulkDelete('Person', null, {});
    }
};
