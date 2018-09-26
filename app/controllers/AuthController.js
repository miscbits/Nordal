const axios = require('axios');
const Student = require("../models/student");

module.exports = {
    github: function(req, res, next) {
        axios.post('https://github.com/login/oauth/access_token', {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code: req.headers.code,
                redirect_uri: req.headers.redirect_uri,
                state: req.headers.state 
            }
        })
        .then((response) => {
            const response = response;
        })
        .catch((error) => {
            return next(error, req, res, next);
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
                        github_id: response.id,
                        github_username: response.login,
                        name: response.name,
                        email: response.email
                    })
                    .then((student) => {
                        return res.status(200).json({student: student, access_token: response.access_token});
                    });
                }

                return res.status(200).json({student: student, access_token: response.access_token});
            });
        })
        .catch((error) => {
            return next(error);
        });
    },
    google: function(req, res, next) {
        axios.post('https://www.googleapis.com/oauth2/v4/token', {
            params: {
                code: req.headers.code,
                redirect_uri: req.headers.redirect_uri,
                client_id: process.env.GOOGLE_CONSUMER_KEY,
                client_secret: process.env.GOOGLE_CONSUMER_SECRET,
                grant_type: "authorization_code"
            }
        })
        .then((response) => {
            axios.get("https://www.googleapis.com/plusDomains/v1/people/me", {
                headers: {
                    Authorization: "Bearer " + response.access_token
                }
            })
            .then((person) => {
                if (person.domain != "zipcodewilmington.com") {
                    return res.status(413).json({message: "Only Zipcode Wilmington Staff may log in using their Google Account"});
                }
                else {
                    return res.status(200).json({person: person, access_token: response.access_token});
                }
            })
            .catch((err) => {
                return next(err)
            });
        })
        .catch((error) => {
            return next(error);
        });
    }
}

