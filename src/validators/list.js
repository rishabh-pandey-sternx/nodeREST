const Joi = require('joi');

let listValidator={}

listValidator.createList = ((req,res,next)=>{
  return Joi.object().keys({
    listName: Joi.string().min(3).max(15).required()
  })
})


module.exports = listValidator;
