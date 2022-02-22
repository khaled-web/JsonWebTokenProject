const express = require('express');
const router = express.Router();

//importing the functions from controller
const {
 login,
 dashboard
} = require('../controllers/main');

// making the routes
router.route('/dashboard').get(dashboard);
router.route('/login').post(login)

//exporting the routes to app.js
module.exports = router;