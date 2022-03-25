const responseTransformer = (res, data, message, success) => {
    return res.send({
      data,
      message,
      success
    });
  };
  
  module.exports = responseTransformer;
  