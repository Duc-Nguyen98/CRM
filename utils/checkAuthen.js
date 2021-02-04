//TODO Middleware checkAuthentication

const usersModel = require('../model/schemasUsers')
const checkAuthentication = async (req, res, next) => {
    try {
        //?check login
        let token = req.cookies.token;
        //?check again db
        let idUser = jwt.verify(token, 'mk');
        await usersModel
            .findOne({
                _id: idUser._id
            })
            .then(data => {
                if (data) {
                    userObj = data;
                    next();
                }
            })
    } catch (err) {
        res.redirect('/');
    }
}

module.exports = checkAuthentication;