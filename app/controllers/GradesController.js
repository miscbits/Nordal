const models = require('../models');
const Grade = models.grades;

module.exports = {
  index: index,
  show: show,
  store: store,
  update: update,
  destroy: destroy
};

function index(req, res, next) {
    Grade.findAll()
    .then((grades => {
      return res.status(200)
        .json(grades);
    })
  );
}

function show(req, res, next) {
  Grade.findById(req.params.id)
    .then((grades => {
      return res.status(200)
        .json(grades);
    })
  );
}

function store(req, res, next) {
  transientGrade = {
      student_id: req.body.student_id
    , assessment_id: req.body.assessment_id
    , grade: req.body.grade
  }

  Grade.build(transientGrade)
    .save()
    .then((grade) => {
      return res.status(201)
        .json(grade);
    })
    .catch(err => {
      return next(err);
    }
  );

}

function update(req, res, next) {
    Grade.findById(req.params.id)
        .then((grade) => {
            let updateVals = {};

            if (req.body.student_id) {
                updateVals.url = req.body.student_id;
            }
            if (req.body.assessment_id) {
                updateVals.assessment_id = req.body.assessment_id;
            }
            if (req.body.grade) {
                updateVals.grade = req.body.grade;
            }

            grade.update(updateVals)
                .then((updatedGrade) => {
                    return res.status(200).json(updatedGrade);
                })
        })
        .catch(err => {
            return res.status(404).json({message: "Grade not found"});
        }
    );
}

function destroy(req, res, next) {
    const affected_rows = Grade.destroy({
        where: {
          id: req.params.id
        }
    });

    return res.status(200).json({message: "success"});
}
