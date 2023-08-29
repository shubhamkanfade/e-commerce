/**
 * Send simple response with mentioned response status code
 * @param  {JSON Object/Array} data       - Data to be returned
 * @param  {int} status                   - Http status code to be returned
 * @param  {HttpResponse} res             - NodeJS response object
 */

var sendResponse = function (data, status, res) {
  var response = {
    status: {
      status_code: 0,
      message: "SUCCESS",
    },
    payload: data,
  };

  res.status(status).json(response);
};

/**
 * Send simple response with mentioned response status code
 * @param  {JSON Object/Array} data       - Data to be returned
 * @param  {int} status                   - Http status code to be returned
 * @param  {HttpResponse} res             - NodeJS response object
 */


var sendErrorResponse = function (data, status, res) {
  var response = {
    status: {
      status_code: 1,
      message: "ERROR",
    },
    payload: data,
  };

  res.status(status).json(response);
};

module.exports = {
  sendResponse: sendResponse,
  sendErrorResponse: sendErrorResponse,
};
