//importing the JWT_package
const jwt = require('jsonwebtoken');

//importing the customError
const CustomError = require('../errors/custom-error')
const {
 UnauthenticatedErrors
} = require('../errors')

const authenticationMiddleware = async (req, res, next) => {
 //Double check on authorization header "JWT"
 const authHeader = req.headers.authorization;

 if (!authHeader || !authHeader.startsWith('Bearer ')) { // if there are no "authHeader", or "authorHeader" will not start with "Bearer "
  throw new CustomError('No token provided', 401)
 }

 const tokenAccess = authHeader.split(' ')[1] // to get the 'AccessToken'

 //verityToken
 try {
  const decoded = jwt.verify(tokenAccess, process.env.JWT_SECRET)
  // console.log(decoded); //to get the payloadInput(user,id, iat, expiresIn)
  const {
   id,
   username
  } = decoded;
  // to set "req.user" is equal to id, username
  req.user = {
   id,
   username
  };
  next(); //veryImportantStep

 } catch (error) {
  throw new CustomError('Not Authorized to access this route', 401)
 }

}

module.exports = authenticationMiddleware;