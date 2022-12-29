const express = require('express');//imported express
const User = require('../modules/User');// imported User.js module to use to create user after authentication 
const router = express.Router(); // imported express.router 
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchUser=require('../middleWare/fetchUser');
let Sec_code="!1@2#3"
// Route:1-Using post method we are hitting the end point http://localhost:5000/api/auth/createuser to create a user . No login is required
router.post('/createuser',
  // body is provided  in the thuderclient collection type -json 
  //validaition on email password and name 
  body('email', "email is not valid").isEmail(),
  body('name', "name is short").isLength({ min: 5 }),
  body('password', "password is not correct").isLength({ min: 5 }),
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({errors:errors.array()})
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email })
      if (user) {
        console.log("email is taken")
        return res.status(400).json({success,error: "Email is already taken" });
        
      }
      var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
      // after performing the express validation we have created user json 
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      success=true
      var authToken = jwt.sign(user.id, Sec_code);
      res.json({success,authToken});
      
    } catch (error) {
      console.error(error)
    return res.status(500).json({error:"internal server error"})
    }
   
  }
);
// Route:2-Using post method we are hitting the end point http://localhost:5000/api/auth/login to create a user . No login is required
router.post('/login',
  // body is provided  in the thuderclient collection type -json 
  //validaition on email password and name 
  body('email', "email is not valid").isEmail(),
  body('password', "password is required").exists(),
  async (req, res) => {
    let success=false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({errors:errors.array()})
      return res.status(400).json({success, errors: errors.array() });
    }
   try {
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(400).json({ success,error: "Please login with correct crediential" });
    }
    const passwordCompare= await bcrypt.compare(req.body.password,user.password)
    if (!passwordCompare) {
      return res.status(400).json({ success,error: "Please login with correct crediential" });
    }
    success=true;
    var authToken = jwt.sign(user.id, Sec_code);
    res.json({success,authToken});
   } catch (error) {
    console.error(error)
    return res.status(500).json({error:"internal server error"})
   } 
  })
  // Route:3 -Using post method we are hitting the end point http://localhost:5000/api/auth/getuser to create a user .login is required
  router.post('/getuser',fetchUser,
  async (req, res) => {
    try {
      const userId=req.user
      const user= await User.findById(userId).select("-password")
      res.send(user);

    } catch (error) {
      console.error(error)
    return res.status(500).json({error:"internal server error"})
    }
  })

module.exports = router