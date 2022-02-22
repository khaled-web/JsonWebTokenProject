//dotenv...to secure you database
require('dotenv').config();

// incase of errors
require('express-async-errors');

const express = require('express');
const app = express();

//importing the routes
const mainRouter = require('./routes/main.js')

// incase of...Route isn't found
const notFoundMiddleware = require('./middleware/not-found');
// incase of...There are an error
const errorHandlerMiddleware = require('./middleware/error-handler');

//middleware...implementation the routes
app.use('/api/v1/', mainRouter);

//middleware..."present files"
app.use(express.static('./public'));
//middleware...to use req.body
app.use(express.json());

// middleware...incase of route isn't found__implementation
app.use(notFoundMiddleware);
// middleware...incase of there are an error__implementation
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();