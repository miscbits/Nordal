const models = require('../models');
const Op = require('sequelize').Op;
const Lab = models.labs;
const Assessment = models.assessments;
const Submission = models.submissions;
const Student = models.students;

module.exports = {
  labHandler: labHandler,
  assessmentHandler: assessmentHandler
}


function labHandler(req, res, next) {
  let lab_url = req.body.repository.html_url;

  Lab.findOne({
    where: {
      url: lab_url
    },
    include: {
      model: models.students,
      as: "students",
      where: {
        [Op.or]: {
          github_username: {
            $iLike: req.body.pull_request.user.login
          },
          zipcode_rocks_username: {
            $iLike: req.body.pull_request.user.login
          }
        }
      }
    }
  }).then(lab => {
    if(!lab) {
      return res.status(404).json({message: "This lab was not assigned to user: " + req.body.pull_request.user.login});
    }

    let pr_url = req.body.pull_request.url;
    let submission_url = req.body.pull_request.head.repo.html_url;
    let latest_hash = req.body.pull_request.head.sha;
    if(!pr_url) {
      pr_url = req.body.pull_request.html_url;
    }

    let transientSubmission = {
        submittable: 'lab'
      , student_id: lab.students[0].id
      , submittable_id: lab.id
    }
    Submission.findOrCreate({
        where: transientSubmission,
        defaults: {
            pr_url: pr_url
          , latest_hash: latest_hash
          , submission_url: submission_url
        }
      })
      .spread((submission, created) => {
        if(!created) {
          submission.update({
            latest_hash: latest_hash
          }).then(updated => {
            return res.status(200).send();
          })
        } else{
          return res.status(200).send();
        }
      })
      .catch(err => {
        return res.status(500).json("something went wrong building this submission");
      }
    );
  }).catch(err => {
    return res.status(404).json("something went wrong finding the lab");
  });
}

function assessmentHandler(req, res, next) {
  let assessment_url = req.body.repository.html_url;

  assessment_promise = Assessment.findOne({
    where: {
      url: assessment_url
    },
  });

  student_promise = Student.findOne({
    where: {
      [Op.or]: {
        github_username: {
          $iLike: req.body.pull_request.user.login
        },
        zipcode_rocks_username: {
          $iLike: req.body.pull_request.user.login
        }
      }
    }
  });

  Promise.all([assessment_promise, student_promise]).then(resolutions => {
    assessment = resolutions[0];
    student = resolutions[1];

    var today = new Date();

    if(assessment.due_date > today) {
      return res.status(403).json({message: "This submission was turned in after the due date"});
    }

    let pr_url = req.body.pull_request.url;
    let submission_url = req.body.pull_request.head.repo.html_url;
    let latest_hash = req.body.pull_request.head.sha;
    if(!pr_url) {
      pr_url = req.body.pull_request.html_url;
    }

    transientSubmission = {
        submittable: 'assessment'
      , student_id: student.id
      , submittable_id: assessment.id
    }

    Submission.findOrCreate({
        where: transientSubmission,
        defaults: {
            pr_url: pr_url
          , latest_hash: latest_hash
          , submission_url: submission_url
        }
      })
      .spread((submission, created) => {
        if(!created) {
          submission.update({
            latest_hash: latest_hash
          }).then(updated => {
            return res.status(200).send();
          })
        } else{
          return res.status(200).send();
        }
      })
      .catch(err => {
        return next(err);
      }
    );
  }).catch(err => {
    return next(err);
  });
}