const models = require('../models');
const Student = models.students;
const Grade = models.grades;
const Assessment = models.assessments;

module.exports = {
  index: index,
  show: show
};

function index(req, res, next) {
    Assessment.findAll({
        include: [{
            model: Grade,
            as: 'grades',
            where: {
                student_id: req.params.student_id
            },
            required: false
        },
        {
            model: models.submissions,
            as: "submissions",
            where: {
                student_id: req.params.student_id
            },
            required: false
        }]
    }).then(assessments => {
        return res.status(200).json(assessments);
    }).catch(err => {
        return next(err);
    });
}

function show(req, res, next) {
    Student.findAll({
        include: [{
            model: models.submissions,
            as: "submissions",
            where: {
                submittable: 'assessment',
                submittable_id: req.params.id
            },
            required:false
        }]
    }).then(students =>{
        return res.status(200).json(students);
    })
}
