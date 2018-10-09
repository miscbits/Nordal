var axios = require('axios')

module.exports = (req, res, next) => {
    if(req.authenticatedUserIsStaff == true){
        return next();
    }
    else if(req.authenticatedUserIsStudent == true && req.authenticatedStudent.id == req.params.student_id) {
        return next();
    }
    else {
    	return res.status(401).json('You do not have permission to view this content');
    }
}
