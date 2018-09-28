const sequelize = require('../models').sequelize;
const Student = sequelize.import("../models/student");
const Lab = sequelize.import("../models/labs");



module.exports = {
  index: index,
  update: update,
  destroy: destroy
};

function index(req, res, next) {
    Student.findById(req.params.student_id)
      .then((student) => {
        student.getLabs(assignments => {
          return res.status(200).json(assignments);
        })
      })
      .catch(err => {
        return next(err)
      }
    );
}

function update(req, res, next) {
    student_promise = Student.findById(req.params.student_id);
    lab_promise = Lab.findById(req.params.id);

    Promise.all([student_promise, lab_promise])
        .then(values => {
            let student = values[0];
            let lab = values[1];

            student.addAssignment(lab).then(() => {
                return res.status(201).json(student);
            });
        })
        .catch(err => {
            return next(err);
        }
    );
}

function destroy(req, res, next) {
    student_promise = Student.findById(req.params.student_id);
    lab_promise = Lab.findById(req.params.id);

    Promise.all([student_promise, lab_promise])
        .then(values => {
            let student = values[0];
            let lab = values[1];

            student.removeAssignment(lab).then(() => {
                return res.status(200).json({message: "success"});
            });
        })
        .catch(err => {
            return next(err);
        }
    );
}
