const axios = require('axios');
const sequelize = require('../models').sequelize;
const Student = sequelize.import("../models/student");
const querystring = require('querystring');

module.exports = {
    github: function(req, res, next) {
        axios.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: req.headers.code,
            redirect_uri: req.headers.redirect_uri,
            state: req.headers.state
        },
        {
            headers: {
                Accept: "application/json"
            },
        })
        .then((response) => {
            console.log("access_token: " + response.data.access_token);
            axios.get('https://api.github.com/user', {
                headers: {
                    Accept: "application/json",
                    Authorization: "token " + response.data.access_token
                }
            })
            .then((response) => {
                Student.findOne({
                    where: {
                        github_username: response.data.login
                    }
                }).then((students) => {
                    const student = students.dataValues;
                    if (student == null) {
                        return res.status(401).json('Github username is not a listed student')
                    }
                    else if (student.github_id == null) {
                        Student.update({
                            github_id: response.data.id,
                            github_username: response.data.login,
                            name: response.data.name,
                            email: response.data.email
                        },
                        {
                            where: {
                                id: student.id
                            }
                        })
                        .then((student) => {
                            return res.status(200).json({student: student.dataValues, access_token: response.data.access_token});
                        });
                    }
                    else {
                        return res.status(200).json({student: student, access_token: response.data.access_token});
                    }

                });
            })
            .catch((error) => {
                return next(error);
            });
        })
        .catch((error) => {
            return next(error);
        });

    },
    google: function(req, res, next) {
        axios.post('https://www.googleapis.com/oauth2/v4/token', querystring.stringify({
            code: req.headers.code,
            redirect_uri: req.headers.redirect_uri,
            client_id: process.env.GOOGLE_CONSUMER_KEY,
            client_secret: process.env.GOOGLE_CONSUMER_SECRET,
            grant_type: "authorization_code"
        }),
        {
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        })
        .then((response) => {
            axios.get("https://www.googleapis.com/userinfo/v2/me", {
                headers: {
                    Authorization: "Bearer " + response.data.access_token
                }
            })
            .then((person) => {
                if (person.data.hd != "zipcodewilmington.com") {
                    return res.status(401).json({message: "Only Zipcode Wilmington Staff may log in using their Google Account"});
                }
                else {
                    return res.status(200).json({person: person.data, access_token: response.access_token});
                }
            })
            .catch((error) => {
                return next(error)
            });
        })
        .catch((error) => {
            return next(error);
        });
    }
}

