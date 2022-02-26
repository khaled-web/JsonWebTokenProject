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
  console.log(req.user)

  //Random value
  const luckNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your luck number is ${luckNumber}`
  })
}

module.exports = {
  login,
  dashboard
}