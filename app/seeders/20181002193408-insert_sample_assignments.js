'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('assignments', [{
          student_id: 1,
          lab_id: 1
        },{
          student_id: 2,
          lab_id: 1
        },{
          student_id: 3,
          lab_id: 1
        },{
          student_id: 4,
          lab_id: 1
        },{
          student_id: 1,
          lab_id: 2
        },{
          student_id: 2,
          lab_id: 2
        },{
          student_id: 3,
          lab_id: 2
        },{
          student_id: 4,
          lab_id: 2
        },{
          student_id: 1,
          lab_id: 3
        },{
          student_id: 2,
          lab_id: 3
        },{
          student_id: 3,
          lab_id: 3
        },{
          student_id: 4,
          lab_id: 3
        },{
          student_id: 1,
          lab_id: 4
        },{
          student_id: 2,
          lab_id: 4
        },{
          student_id: 3,
          lab_id: 5
        },{
          student_id: 4,
          lab_id: 5
        },{
          student_id: 1,
          lab_id: 6
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('assignments', null, {});
    }
};
