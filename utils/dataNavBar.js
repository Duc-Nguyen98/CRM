//TODO middleware Data Nav

const dataNav = async (req, res, next) => {
    await test2Model
        .find({})
        .then(data => {
            itemNav = data;
            next();
        })
}


module.exports = dataNav;