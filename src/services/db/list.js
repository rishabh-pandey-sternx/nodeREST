const { get } = require('lodash');
const list = require('../../models/list.model');
var mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

let service = {};

// Create a new list
service.create = async data => {
    const listData = new list({
      listName: data.listName,
      userId: data.user.id,
    }) 
   return await listData.save();
};

service.getListByUserId = async data => {
  return await list.find({ userId: data.userId });
};
// Fetch list by id
service.getOneById = async data => {
    return await list.findById({_id: data});
};
 
  
service.getAll = async data => {
  try {
    const limit = parseInt(data.limit) || process.env.LIMIT;
    const offset = parseInt(data.skip)  || process.env.SKIP;
    const listsCollection = await list.find()
      .skip(offset)
      .limit(limit)
    const listsCollectionCount = await list.count()
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

service.update = async (data,id) => {
  return await list.findByIdAndUpdate({_id:id}, $set = {listName: data.listName}, { new: true });
};

service.destroy = async id => {
  return await list.findByIdAndRemove({_id:id});
}
  

  module.exports = service;