const models = require('../models');
const Comment = models.comments;
const Student = models.students;

module.exports = {
  index: index,
  show: show,
  store: store,
  update: update,
  destroy: destroy
};

function index(req, res, next) {
    Comment.findAll({
      where: {
        student_id: req.params.student_id
      }
    })
    .then((comments => {
      return res.status(200)
        .json(comments);
    })
  );
}

function show(req, res, next) {
  Comment.findById(req.params.id, {
    where: {
      student_id: req.params.student_id
    }
  })
  .then((comment => {
      if (comment) {
        return res.status(200).json(comments);
      } else {
        return res.status(404).send();
      }
    })
  );
}

function store(req, res, next) {
  transientComment = {
      body: req.body.body
    , student_id: req.params.student_id
    , note_taker: req.staffEmail
  }

  Comment.build(transientComment)
    .save()
    .then((comment) => {
      return res.status(201)
        .json(comment);    
    })
    .catch(err => {
      return next(err);
    }
  );

}

function update(req, res, next) {
    let updateVals = {};

    if (req.body.body) {
        updateVals.body = req.body.body;
    }
    else {
      return res.status(400).json({message: "Body must be present"})
    }
    Comment.findById(req.params.id, {
          where: {
            student_id: req.params.student_id
          }
        })
        .then((comment) => {
            if (!comment) {
              return res.status(404).send();
            }
            comment.update(updateVals)
              .then((updatedComment) => {
                  return res.status(200).json(updatedComment);
            })
        })
        .catch(err => {
            return res.status(404).send();
        }
    );
}

function destroy(req, res, next) {
    const affected_rows = Comment.destroy({
        where: {
          id: req.params.id,
          student_id: request.params.student_id
        }
    });

    return res.status(200).json({message: "success"});
}
