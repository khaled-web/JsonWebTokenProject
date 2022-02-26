//importing CustomAPIError
const CustomAPIErrors = require('./custom-error');

//activate "http-status-codes"
const {
 StatusCodes
} = require('http-status-codes');

class BadRequest extends CustomAPIErrors {
 constructor(message) {
  super(message)
  this.statusCode = StatusCodes.BadRequest;
 }
}

module.exports = BadRequest;