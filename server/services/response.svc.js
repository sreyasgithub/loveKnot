const responseSvc = {
  successMsg: (res, message) => {
    return res.status(200).json({
      success: true,
      message,
    });
  },
  successData: (res, message, dataObj) => {
    return res.status(200).json({
      success: true,
      message,
      ...dataObj,
    });
  },
  clientError: (res, message) => {
    return res.status(400).json({
      success: false,
      message,
    });
  },
  serverError: (res, error) => {
    return res.status(500).json({
      error: error.message,
    });
  },
};

module.exports = responseSvc;
