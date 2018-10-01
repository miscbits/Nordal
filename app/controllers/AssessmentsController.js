const models = require('../models');
const Assessment = models.assessments;

module.exports = {
  index: index,
  show: show,
  store: store,
  update: update,
  destroy: destroy
};

function index(req, res, next) {
    Assessment.findAll()
    .then((assessments => {
      return res.status(200)
        .json(assessments);
    })
  );
}

function show(req, res, next) {
  Assessment.findById(req.params.id)
    .then((assessments => {
      return res.status(200)
        .json(assessments);
    })
  );
}

function store(req, res, next) {
  transientAssessment = {
      url: req.body.url
    , level: req.body.level
    , max_score: req.body.max_score
  }

  Assessment.build(transientAssessment)
    .save()
    .then((assessment) => {
      return res.status(201)
        .json(assessment);
    })
    .catch(err => {
      return next(err);
    }
  );

}

function update(req, res, next) {
    Assessment.findById(req.params.id)
        .then((assessment) => {
            let updateVals = {};

            if (req.body.url) {
                updateVals.url = req.body.url;
            }
            if (req.body.level) {
                updateVals.level = req.body.level;
            }
            if (req.body.max_score) {
                updateVals.max_score = req.body.max_score;
            }

            assessment.update(updateVals).
                .then((updatedAssessment) => {
                    return res.status(200).json(updatedAssessment);
                })
        })
        .catch(err => {
            return res.status(404).json({message: "Assessment not found"});
        }
    );
}

function destroy(req, res, next) {
    const affected_rows = Assessment.destroy({
        where: {
          id: req.params.id
        }
    });

    return res.status(200).json({message: "success"});
}