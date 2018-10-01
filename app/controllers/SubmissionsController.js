const models = require('../models');
const Submission = models.submissions;

module.exports = {
  index: index,
  show: show,
  store: store,
  update: update,
  destroy: destroy
};

function index(req, res, next) {
    Submission.findAll()
    .then((submissions => {
      return res.status(200)
        .json(submissions);    
    })
  );
}

function show(req, res, next) {
  Submission.findById(req.params.id)
    .then((submissions => {
      return res.status(200)
        .json(submissions);    
    })
  );
}

function store(req, res, next) {
  transientSubmission = {
      url: req.body.url
    , name: req.body.name
    , due_date: req.body.due_date
    , assigned_date: req.body.assigned_date
  }

  Submission.build(transientSubmission)
    .save()
    .then((submission) => {
      return res.status(201)
        .json(submission);    
    })
    .catch(err => {
      return next(err);
    }
  );

}

function update(req, res, next) {
    Submission.findById(req.params.id)
        .then((submission) => {
            let updateVals = {};

            if (req.body.url) {
                updateVals.url = req.body.url;
            }
            if (req.body.name) {
                updateVals.name = req.body.name;
            }
            if (req.body.due_date) {
                updateVals.due_date = req.body.due_date;
            }
            if (req.body.assigned_date) {
                updateVals.assigned_date = req.body.assigned_date;
            }

            submission.update(updateVals)
                .then((updatedSubmission) => {
                    return res.status(200).json(updatedSubmission);
                })
        })
        .catch(err => {
            return res.status(404).json({message: "Submission not found"});
        }
    );
}

function destroy(req, res, next) {
    const affected_rows = Submission.destroy({
        where: {
          id: req.params.id
        }
    });

    return res.status(200).json({message: "success"});
}
