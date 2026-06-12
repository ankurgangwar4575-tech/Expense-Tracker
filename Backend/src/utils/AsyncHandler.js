const asyncHandler = (requestHandler) => {
 return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      next(err);
    });
  };
};

module.exports=asyncHandler;

// const asyncHandler = (fn) => async (error, req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: `Error occurred : ${err.message}`,
//     });
//   }
// };
