const { get } = require('lodash');
const list = require('../../models/list');

let service = {};

// Create a new list
service.create = async data => {
    const listData = new listSchema({
      email: data.email.toLowerCase(),
      fullName: data.fullName,
      userType: data.userType || 'user',
      password: data.password
    }) 
   return await listData.save((err, listDoc) => {
      if (err) {
        return err;
      }
      return listDoc;
  });
  };


// Fetch list by id
service.getOneById = async data => {

};
 
  
service.getAll = async data => {
  try {
    const limit = parseInt(data.limit) || process.env.LIMIT;
    const offset = parseInt(data.skip)  || process.env.SKIP;
    const listsCollection = await users.find()
      .skip(offset)
      .limit(limit)
    const listsCollectionCount = await users.count()
    const totalPages = Math.ceil(listsCollectionCount / limit)
    const currentPage = Math.ceil(listsCollectionCount % offset)
    return {
      data: listsCollection,
      paging: {
        total: listsCollectionCount,
        page: currentPage,
        pages: totalPages,
      },
    }
  } catch (e) {
    return e;
  }
};

service.update = async data => {

};

service.destroy = async data => {

}
  

  module.exports = service;