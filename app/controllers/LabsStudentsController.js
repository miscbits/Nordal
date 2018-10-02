const models = require('../models');
const Lab = models.labs;

module.exports = {
  show: show
};

function show(req, res, next) {
  Lab.findById(req.params.id)
  .then((lab) => {
    lab.getStudents({
      include: [{
        model: models.submissions,
        as: "submissions",
        where: {
          submittable_id: lab.id,
          submittable: 'lab' 
        }
      }]
    })
    .then(students => {
      return res.status(200).json({lab: lab, students: students});
    })
    .catch(err => {
      return next(err);
    });
  });
}
