const models = require('../models');
const Student = models.students;
const Lab = models.labs;

module.exports = {
  index: index,
  assign: assign,
  update: update,
  destroy: destroy
};

function index(req, res, next) {
    Student.findById(req.params.student_id)
      .then((student) => {
        student.getLabs({
            include: [{
                model: models.submissions,
                as: "submissions",
                where: {
                    student_id: student.id
                }
            }]
        })
        .then(assignments => {
            return res.status(200).json(assignments);
        })
        .catch(err => {
            return next(err);
        });
      })
      .catch(err => {
        return next(err)
      }
    );
}

function assign(req, res, next) {
    student_promise = Student.findAll();
    lab_promise = Lab.findById(req.params.id);

    Promise.all([student_promise, lab_promise])
        .then(values => {
            let students = values[0];
            let lab = values[1];
            lab.assigned_date = models.sequelize.fn('NOW');

            Promise.all([lab.setStudents(students), lab.save()])
            .then((associatedStudents) => {
                return res.status(200).json({message: "success"});
            })
            .catch(err => {
                return next(err);
            });

        })
        .catch(err => {
            return next(err);
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
                return res.status(201).json({student: student, lab: lab});
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
