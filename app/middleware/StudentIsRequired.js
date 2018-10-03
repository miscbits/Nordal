var axios = require('axios');
const models = require('../models');
const Student = models.students;

module.exports = (req, res, next) => {
    axios.get('https://api.github.com/user', {
        headers: {
            Accept: "application/json",
            Authorization: "token " + req.headers.token
        }
    })
    .then((response) => {
        Student.findOne({
            where: {
                github_username: response.data.login
            }
        }).then((student) => {
            if (student == null) {
                return res.status(401).json('Github username is not a listed student');
            }

            req.authenticatedUserIsStudent = true;
            req.authenticatedStudent = student;
            next();
        })
        .catch(error => {
            return next(error);
        });
    })
    .catch((error) => {
        req.authenticatedUserIsStudent = false;
        next();
    });
}