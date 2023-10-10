const yup = require("yup");

const validation = async (req, res , next) =>{
    const userValidation = yup.object({
        body: yup.object({
            firstname: yup.string().required(),
            lastname: yup.string().required(),
            email: yup.string().required(),
            password: yup.string().required(),
        })
    })
    try{
        await userValidation.validate(req.body, { abortEarly: false });
        next();
    }
    catch(error){
        res.send(error);
    }
}

module.exports = validation;