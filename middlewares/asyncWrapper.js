module.exports = (asyncFn) => {
  return (req, res, next) => {
    asyncFn(req, res, next).catch((err) => {
      next(err )
    });
  };
};



// try {
  // } catch (err) {
  //   return res.status(400).json({
  //     status: httpStatusText.ERROR,
  //     data: null,
  //     message: err.message,
  //     code: 400,
  //   });
  // }