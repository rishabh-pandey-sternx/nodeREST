const Joi = require('joi');

let listValidator={}

listValidator.createList = ((req,res,next)=>{
  return Joi.object().keys({
    email: Joi.string().allow(''),
    fullName: Joi.string().min(3).max(15).required(),
    password: Joi.string().required(),
    userType: Joi.string().required()
  })
})


module.exports = listValidator;
