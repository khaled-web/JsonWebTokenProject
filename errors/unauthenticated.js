//importing CustomAPIError
const CustomAPIErrors = require('./custom-error');

//activate "http-status-codes"
const {
 StatusCodes
} = require('http-status-codes');


class UnauthenticatedError extends CustomAPIErrors {
 constructor(message) {
  super(message)
  this.statusCode = StatusCodes.UNAUTHORIZED;
 }
}

module.exports = UnauthenticatedError;