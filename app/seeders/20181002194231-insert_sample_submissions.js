'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('submissions', [{
            pr_url: "www.example.com/pr/pr_id"
          , student_id: 1
          , submittable: "lab"
          , submittable_id: 1
        },{
            pr_url: "www.example.com/pr/pr_id"
          , student_id: 2
          , submittable: "lab"
          , submittable_id: 1
        },{
            pr_url: "www.example.com/pr/pr_id"
          , student_id: 3
          , submittable: "lab"
          , submittable_id: 1
        },{
            pr_url: "www.example.com/pr/pr_id"
          , student_id: 4
          , submittable: "lab"
          , submittable_id: 1
        },{
            pr_url: "www.example.com/pr/pr_id"
          , student_id: 1
          , submittable: "lab"
          , submittable_id: 2
        },{
            pr_url: "www.example.com/pr/pr_id"
          , student_id: 2
          , submittable: "lab"
          , submittable_id: 2
        },{
            pr_url: "www.example.com/pr/pr_id"
          , student_id: 4
          , submittable: "lab"
          , submittable_id: 2
        },{
            pr_url: "www.example.com/pr/pr_id"
          , student_id: 1
          , submittable: "lab"
          , submittable_id: 3
        },{
            pr_url: "www.example.com/pr/pr_id"
          , student_id: 1
          , submittable: "lab"
          , submittable_id: 4
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('submissions', null, {});
    }
};
