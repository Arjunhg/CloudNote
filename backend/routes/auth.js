const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Arjunisagoodb$oy';

/**Code for GET
 * 
 * const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = router;

 */

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({success, error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);   
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user of mongoose model
    user = await User.create({
      name: req.body.name,
      password: secPass,//variable names secPass
      email: req.body.email,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);


    // res.json(user)
    success = true;
    res.json({success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error", error.message);
  }
})


// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [//login endpoint
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;

  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;//Using destructuring taking email and password out of the body
  try {
    let user = await User.findOne({ email });//Pulling email of the database
    if (!user) {
      success = false;
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id//Using userID for document retreival and not user as its more fast
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required. Will take ingfo from JWT token
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id; //appended in fetchuser
    const user = await User.findById(userId).select("-password") //Token have user ID. Accept all fields except password
    res.send(user)//if not used, thunderbolt or any other wont send response to provided post or get request
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router

// const {email, password} = req.body;//Using destructuring taking email and password out of the body
// try {
//   let user = await User.findOne({email}); //Pulling email of the database

//   id: user.id//Using userID for document retreival and not user as its more fast

//   password: secPass,//variable names secPass

