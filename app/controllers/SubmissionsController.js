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
      pr_url: req.body.pr_url
    , submission_url: req.body.submission_url
    , submittable: req.body.submittable
    , latest_hash: req.body.latest_hash
    , student_id: req.body.student_id
    , submittable_id: req.body.submittable_id
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

            if (req.body.pr_url) {
                updateVals.pr_url = req.body.pr_url;
            }
            if (req.body.submission_url) {
                updateVals.submission_url = req.body.submission_url;
            }
            if (req.body.submittable) {
                updateVals.submittable = req.body.submittable;
            }
            if (req.body.latest_hash) {
                updateVals.latest_hash = req.body.latest_hash;
            }
            if (req.body.student_id) {
                updateVals.student_id = req.body.student_id;
            }
            if (req.body.submittable_id) {
                updateVals.submittable_id = req.body.submittable_id;
            }

            submission.update(updateVals)
                .then((updatedSubmission) => {
                    return res.status(200).json(updatedSubmission);
                });
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
