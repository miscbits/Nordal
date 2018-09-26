module.exports = (req, res, next) => {
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
        });
    })
    .catch((error) => {
        return next(error);
    });
}