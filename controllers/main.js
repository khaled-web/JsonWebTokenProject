// check username, password in post(login) request
// if exist, create new JWT
//send back to front-end
//setup authentication so only the request with JWT can access the dashboard



//importing the JWT_package
const jwt = require('jsonwebtoken');

//importing the customError
const CustomAPIError = require('../errors/custom-error')

//Post_HttpRequest-Function
const login = async (req, res) => {
  const {
    username,
    password
  } = req.body
  //mongoose validation
  //Joi
  //check in the controller

  if (!username || !password) {
    throw new CustomAPIError('Please Provide email and password', 400)
  }

  //just for demo, normally provided by DB!!!!
  const id = new Date().getDate();

  //try to keep payload small, better experience for user 
  //just for demo, in production use long, complex and unguessable string value !!!!!!!!!!!!!
  const token = jwt.sign({
      id,
      username
    },
    process.env.JWT_SECRET, {
      expiresIn: '30d'
    })

  res.status(200).json({
    msg: 'user created',
    token
  })
}

//Get_HttpRequest-Function
const dashboard = async (req, res) => {
  //Double check on authorization header "JWT"
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) { // if there are no "authHeader", or "authorHeader" will not start with "Bearer "
    throw new CustomAPIError('No token provided', 401)
  }

  const tokenAccess = authHeader.split(' ')[1] // to get the 'AccessToken'


  //verityToken
  try {
    const decoded = jwt.verify(tokenAccess, process.env.JWT_SECRET)
    // console.log(decoded); //to get the payloadInput(user,id, iat, expiresIn)
    //Random value
    const luckNumber = Math.floor(Math.random() * 100);

    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your authorized data, your luck number is ${luckNumber}`

    })
  } catch (error) {
    throw new CustomAPIError('Not Authorized to access this route', 401)
  }

}

module.exports = {
  login,
  dashboard
}