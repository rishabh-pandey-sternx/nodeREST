const { get } = require('lodash');
const users = require('../../models/users');

const userSchema = require('../../models/users')

let service = {};

// Create a new user
service.create = async data => {
    const userData = new userSchema({
      email: data.email.toLowerCase(),
      fullName: data.fullName,
      userType: data.userType || 'user',
      password: data.password
    }) 
   return await userData.save((err, userDoc) => {
      if (err) {
        return err;
      }
      return userDoc;
  });
  };


// Fetch user by id
service.getOneById = async data => {

};

// Fetch user by email
service.getOneByEmail = async data => {
  let user = await users.findOne({ email: data });
  if (!user) {
      throw new Error("No such user exist");
  }
  return (data = {
      userId: user._id,
      email: user.email,
      fullName: user.fullName
  }); 
};
  
service.getAll = async data => {
  try {
    const limit = parseInt(data.limit) || process.env.LIMIT;
    const offset = parseInt(data.skip)  || process.env.SKIP;
    const usersCollection = await users.find()
      .skip(offset)
      .limit(limit)
    const usersCollectionCount = await users.count()
    const totalPages = Math.ceil(usersCollectionCount / limit)
    const currentPage = Math.ceil(usersCollectionCount % offset)
    return {
      data: usersCollection,
      paging: {
        total: usersCollectionCount,
        page: currentPage,
        pages: totalPages,
      },
    }
  } catch (e) {
    console.log("Error", e)
    return e;
  }
};

service.destroy = async data => {
};

  module.exports = service;