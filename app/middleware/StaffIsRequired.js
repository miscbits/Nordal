var axios = require('axios')

module.exports = (req, res, next) => {
	var access_token = req.headers.token;

    axios.get("https://www.googleapis.com/userinfo/v2/me", {
        headers: {
            Authorization: "Bearer " + access_token
        }
    })
    .then(person => {
        if (person.data.hd != "zipcodewilmington.com") {
            return res.status(401).json({message: "Only Zipcode Wilmington Staff may log in using their Google Account"});
        }

        req.authenticatedUserIsStaff = true;
        req.staffEmail = 'wilhem@zipcodewilmington.com'
        next();

    })
    .catch(error => {
        req.authenticatedUserIsStaff = false;
        next();
    });
}
