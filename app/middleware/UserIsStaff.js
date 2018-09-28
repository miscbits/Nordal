var axios = require('axios')

module.exports = (req, res, next) => {
	var access_token = req.headers.access_token;

    axios.get("https://www.googleapis.com/plusDomains/v1/people/me", {
        headers: {
            Authorization: "Bearer " + access_token
        }
    })
    .then((person) => {
        if (person.domain != "zipcodewilmington.com") {
            return res.status(413).json({message: "Only Zipcode Wilmington Staff may use this API"});
        }
    })
    .catch((err) => {
        return next(err)
    });


	return next();
}
