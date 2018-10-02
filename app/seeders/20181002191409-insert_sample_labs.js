'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('labs', [{
              "url": "www.example.com"
            , "name": "String"
            , "due_date": "20181015"
            , "assigned_date": "20181014"
        },{
              "url": "www.example.com"
            , "name": "Object"
            , "due_date": "20181016"
            , "assigned_date": "20181015"
        },{
              "url": "www.example.com"
            , "name": "MySQL"
            , "due_date": "20181017"
            , "assigned_date": "20181016"
        },{
              "url": "www.example.com"
            , "name": "Dan Do Better"
            , "due_date": "20181018"
            , "assigned_date": "20181017"
        },{
              "url": "www.example.com"
            , "name": "MatLab"
            , "due_date": "20181019"
            , "assigned_date": "20181018"
        },{
              "url": "www.example.com"
            , "name": "Casino Project"
            , "due_date": "20181020"
            , "assigned_date": "20181019"
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('labs', null, {});
    }
};
