const models = require('../models');
const Lab = models.labs;

module.exports = {
  index: index,
  show: show,
  store: store,
  update: update,
  destroy: destroy
};

function index(req, res, next) {
    Lab.findAll({
        order: [['due_date', 'ASC']],
        include: [{
          model: models.submissions,
          as: "submissions"}]
    })
    .then((labs => {
      return res.status(200)
        .json(labs);
    })
  );
}

function show(req, res, next) {
  Lab.findById(req.params.id)
    .then((labs => {
      return res.status(200)
        .json(labs);
    })
  );
}

function store(req, res, next) {
  transientLab = {
      url: req.body.url
    , name: req.body.name
    , due_date: req.body.due_date
    , assigned_date: req.body.assigned_date
  }

  Lab.build(transientLab)
    .save()
    .then((lab) => {
      return res.status(201)
        .json(lab);
    })
    .catch(err => {
      return next(err);
    }
  );

}

function update(req, res, next) {
    Lab.findById(req.params.id)
        .then((lab) => {
            let updateVals = {};

            if (req.body.url) {
                updateVals.url = req.body.url.replace(/\/$/, '');
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

            lab.update(updateVals)
                .then((updatedLab) => {
                    return res.status(200).json(updatedLab);
                })
        })
        .catch(err => {
            return res.status(404).json({message: "Lab not found"});
        }
    );
}

function destroy(req, res, next) {
    const affected_rows = Lab.destroy({
        where: {
          id: req.params.id
        }
    });

    return res.status(200).json({message: "success"});
}
