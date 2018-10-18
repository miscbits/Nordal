const models = require('../models');
const Student = models.students;

module.exports = {
  index: index,
  show: show,
  store: store,
  update: update,
  destroy: destroy
};

function index(req, res, next) {
    Student.findAll()
    .then((students => {
      return res.status(200)
        .json(students);    
    })
  );
}

function show(req, res, next) {
  Student.findById(req.params.student_id)
    .then((students => {
      return res.status(200)
        .json(students);    
    })
  );
}

function store(req, res, next) {
  transientStudent = {
      name: req.body.name
    , email: req.body.email
    , cell_number: req.body.cell_number
    , github_id: null
    , section: req.body.section
    , github_username: req.body.github_username
    , zipcode_rocks_username: req.body.zipcode_rocks_username
  }

  Student.build(transientStudent)
    .save()
    .then((student) => {
      return res.status(201)
        .json(student);    
    })
    .catch(err => {
      return next(err);
    }
  );

}

function update(req, res, next) {
    Student.findById(req.params.student_id)
        .then((student) => {
            let updateVals = {};

            if (req.body.name) {
                updateVals.name = req.body.name;
            }
            if (req.body.email) {
                updateVals.email = req.body.email;
            }
            if (req.body.cell_number) {
                updateVals.cell_number = req.body.cell_number;
            }
            if (req.body.section) {
                updateVals.section = req.body.section;
            }
            if (req.body.github_username) {
                updateVals.github_username = req.body.github_username;
            }
            if (req.body.zipcode_rocks_username) {
                updateVals.zipcode_rocks_username = req.body.zipcode_rocks_username;
            }

            student.update(updateVals)
                .then((updatedStudent) => {
                    return res.status(200).json(updatedStudent);
                })
        })
        .catch(err => {
            return res.status(404).json({message: "Student not found"});
        }
    );
}

function destroy(req, res, next) {
    const affected_rows = Student.destroy({
        where: {
          id: req.params.student_id
        }
    });

    return res.status(200).json({message: "success"});
}
