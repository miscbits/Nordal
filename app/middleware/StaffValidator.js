var axios = require('axios')

module.exports = (req, res, next) => {
    if(req.authenticatedUserIsStaff == true){
        return next();
    };

    return res.status(401).json('You do not have permission to view this content');
}
