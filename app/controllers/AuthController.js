const axios = require('axios');
client_id
client_secret
code
redirect_uri
state
const Student = require("../models/student");
module.exports = {
    github: function(req, res, next) {
        axios.post('https://github.com/login/oauth/access_token', {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code: req.params.code,
                redirect_uri: req.params.redirect_uri,
                state: req.params.state 
            }
        })
        .then((response) => {
            const response = response;
        })
        .catch((error) => {
            return next(error);
        });

        axios.get('https://github.com/user', {
            params: {
                access_token: response.access_token
            }
        })
        .then((response) => {
            Student.findOne({
                where: {
                    github_username: response.login
                }
            }).then((student) => {
                if (student == null) {
                    return res.status(413).send('Github username is not a listed student')
                }
                if (student.github_id == null) {
                    student.save({
                        github_id: resposne.id,
                        github_username: resposne.login,
                        name: response.name,
                        email: response.email
                    })
                    .then((student) => {
                        return res.status(200).json(student);
                    })
                    .catch(error) {
                        next(error)
                    };
                }

                return res.status(200).json(student);
            });
        })
        .catch((error) => {
            return next(error);
        });
    },
    google: function(req, res, next) {

    }
}

