'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('students', [{
            "name": "Sarah Moller",
            "email": "sara@email.net",
            "cell_number": 1111111111,
            "github_id": 124,
            "github_username": "user124"
        },{
            "name": "Joey Smith",
            "email": "joe@smith.net",
            "cell_number": 1111111111,
            "github_id": 123,
            "github_username": "user123"
        },{
            "name": "Brennan Diccandio",
            "email": "brennan@gmail.com",
            "cell_number": 1111111111,
            "github_id": 1776,
            "github_username": "coder_cid"

        },{
            "name": "Axel Maxer",
            "email": "radlad@hotmail.com",
            "cell_number": 1111111111,
            "github_id": 836,
            "github_username": "radlad"
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('students', null, {});
    }
};
