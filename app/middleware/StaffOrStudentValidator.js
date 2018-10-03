var axios = require('axios')

module.exports = (req, res, next) => {
    if(req.authenticatedUserIsStaff == true){
        return next();
    };

    if(req.authenticatedUserIsStudent == true && req.authenticatedStudent.id == req.params.student_id) {
        return next();
    }

    return res.status(413).json('You do not have permission to view this content');
}
