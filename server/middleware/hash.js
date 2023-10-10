const bcrypt = require('bcryptjs')

const hashPassword = async (req, res, next) =>{
    try{
        if(typeof req.body.password === "string"){
        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt)
        req.body.password = hash;
    }
    next();
    }
    catch(error){
        res.send(error);
    }
}

module.exports = hashPassword