const Joi = require('joi');

let listValidator={}

listValidator.createList = ((req,res,next)=>{
  const schema =  Joi.object().keys({
    listName: Joi.string().min(3).max(15).required()
  })
  return schema.validate(req.body);
})

listValidator.getOneList = ((req,res,next)=>{
  const schema =  Joi.object().keys({
    id: Joi.string().required()
  })
  return schema.validate(req.params);
})

listValidator.deleteById = ((req,res,next)=>{
  const schema =  Joi.object().keys({
    id: Joi.string().required()
  })
  return schema.validate(req.params);
})

listValidator.updateById = ((req,res,next)=>{
  const schema =  Joi.object().keys({
    id: Joi.string().required(),
    listName: Joi.string().min(3).max(15).required()
  })
  const data ={...req.body, ...req.params}
  return schema.validate(data);
})

module.exports = listValidator;
