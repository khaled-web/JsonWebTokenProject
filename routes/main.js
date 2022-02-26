const express = require('express');
const router = express.Router();

//importing the functions from controller
const {
 login,
 dashboard
} = require('../controllers/main');
//importing authenticationMiddleware
const authMiddleware = require('../middleware/auth')

// making the routes
router.route('/login').post(login)
router.route('/dashboard').get(authMiddleware, dashboard);

//exporting the routes to app.js
module.exports = router;