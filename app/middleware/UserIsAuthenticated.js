module.exports = (req, res, next) => {
    if(req.headers.token) {
        return next();
    }

    return res.status(401)
        .json({message: "Not authenticated. " +
            "User did not supply an access token"}
    );
}