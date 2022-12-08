const asynHandler = require('express-async-handler')
const AuthModel = require('../models/authModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const authModel = require('../models/authModel')
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client({
  clientId:
    '755428588274-5nl45or7hrlck14neughadquor3bjaph.apps.googleusercontent.com',
})

// nodemailer
const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: '', // generated ethereal user
    pass: '', // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
})

// SIGNUP
const signup = asynHandler(async (req, res) => {
  const { fullname, phoneno, email, password, password2 } = req.body
  // console.log("In backend");
  // console.log(fullname);

  if (!fullname || !phoneno || !email || !password || !password2) {
    res.status(400)
    throw new Error('Please include all fields')
  }
  console.log("fields passed");
  // check both passwords
  if (password !== password2) {
    res.status(400)
    throw new Error('Passwords do not match')
  }
  console.log("passwords passed");

  const emailExist = await AuthModel.findOne({ email })

  // check if email already exists
  if (emailExist) {
    res.status(400)
    throw new Error('Email already exists')
  }

  console.log("Emails passed");

  // setup nodemailer
  const token = jwt.sign(
    { fullname, email, phoneno, password },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '20m',
    }
  )
  console.log(token);
    // save user
    const user = new AuthModel({
      fullname,
      phoneno,
      email,
      password,
    })
  
    await user.save()
  
    if (!user) {
      throw new Error('Something went wrong')
    }
  
    // generate new token
    const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    })
  
    res
      .status(201)
      .json({ successMsg: 'Registered Successfully!', token: newToken })
  // remove this after testing
  // res.json({
  //   token,
  // })

  // try {
  //   await transporter.sendMail({
  //     from: 'noreply@yahoo.com',
  //     to: email,
  //     subject: 'Email Activation Link',
  //     html: `
  //     <h1>Please verify your account by clicking below link</h1>
  //     <a href='${process.env.CLIENT_URI}/activate/${token}'>${process.env.CLIENT_URI}/activate/${token}</a>
  //     `,
  //   })

  //   res.json({
  //     successMsg: 'Activation link sent to your email! please check.',
  //   })
  // } catch (e) {
  //   throw new Error(e)
  // }
})

// @route     /api/auth/activate
// @access    private
const activateAccount = asynHandler(async (req, res) => {
  // // get token
  // const token = req.headers.authorization
  //   ? req.headers.authorization.split(' ')[1]
  //   : null

  // // no token
  // if (!token) {
  //   res.status(401)
  //   throw new Error('Not authorized! no token')
  // }

  // // token exists
  // const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY)

  // // tempered token
  // if (!tokenVerified) {
  //   res.status(403)
  //   throw new Error('Invalid or expired token')
  // }

  // const { fullname, phoneno, email, password } = tokenVerified

  // // check if user alread exists
  // const existUser = await AuthModel.findOne({ email })
  // if (existUser) {
  //   res.status(401)
  //   throw new Error('User already exists with that email')
  // }

   // save user
   const user = new AuthModel({
    fullname,
    phoneno,
    email,
    password,
  })

  await user.save()

  if (!user) {
    throw new Error('Something went wrong')
  }

  // generate new token
  const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  })

  res
    .status(201)
    .json({ successMsg: 'Registered Successfully!', token: newToken })
})

// SIGNIN
const signin = asynHandler(async (req, res) => {
  const { email, password, password2 } = req.body

  if (!email || !password || !password2) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // check both passwords
  if (password !== password2) {
    res.status(400)
    throw new Error('Passwords do not match')
  }
  // check passwords length
  if (password.length < 8 || password2.length < 8) {
    res.status(400)
    throw new Error('Minimum length should be 8 characters')
  }