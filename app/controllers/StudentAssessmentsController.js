const models = require('../models');
const Student = models.students;
const Grade = models.grades;
const Assessment = models.assessments;

module.exports = {
  index: index
};

function index(req, res, next) {
    Assessment.findAll({
        include: [{
            model: Grade,
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
