const Joi = require('joi');

let authValidator={}

authValidator.createUser = ((req,res,next)=>{
  const schema =  Joi.object().keys({
    email: Joi.string().required().email(),
    fullName: Joi.string().min(3).max(15).required(),
    password: Joi.string().required(),
    userType: Joi.string().required()
  });
  return Joi.validate(req.body, schema);
})

authValidator.login = ((req,res,next)=>{
  const schema =  Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  });
   return schema.validate(req.body);

})

authValidator.forgotPassword = ((req,res,next)=>{
  const schema =  Joi.object().keys({
    email: Joi.string().required().email()
  });
   return schema.validate(req.body);
})


authValidator.resetPassword = ((req,res,next)=>{
  const schema =  Joi.object().keys({
    password: Joi.string().required(),
    token: Joi.string().required(),
    id: Joi.string().required(),
  });
  const data ={...req.body, ...req.query}
   return schema.validate(data);
}) 

module.exports = authValidator;
