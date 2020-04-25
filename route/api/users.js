const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const nodemailer = require('nodemailer');

// @route  POST/api/users
//@desc    Register user
//@access  Public
router.post('/register', async (req, res) => {
  // See if user exist
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ errors: { msg: 'User is already registered' } });
    }
    user = new User({
      name,
      email,
      password,
    });
    // // hashing the password

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    // // Returning the jwt token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.jwtSecret, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/current/:id', async (req, res) => {
  const { id } = req.params;

  try {
    let user = await User.findById(id);

    if (!user)
      return res.status(400).json({ msg: 'there is no user for this user' });

    //  Enable the code below to make sure that one user only give one view
    //  and on refresh views wont increase!

    // const ip = req.connection.remoteAddress;
    // if (user.ipOfUsersThatRequestedYourProfile.includes(ip))
    //   return res.json(user);
    // user.ipOfUsersThatRequestedYourProfile.push(ip);

    user.views++;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json('Server Error');
  }
});

router.get('/reset/:email', async (req, res) => {
  const { email } = req.params;

  const code = Math.floor(Math.random() * 9000 + 999);

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { resetCode: code },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: 'there is no user for this email' });
    }

    const transporter = nodemailer.createTransport({
      service: 'Yandex',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Reset Password✔',
      text: `Your Reset Code is ${code}`,
      html: `<h1>Your Reset Code is <ul>${code}</ul></h1>`,
    });

    res.status(200).send('Check Your Email');
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.post('/code_check', async (req, res) => {
  let code = req.body.code;
  let email = req.body.email;

  try {
    const user = await User.findOne({ email });

    if (user.resetCode === code) res.status(200).send('success');
    else res.status(400).send({ msg: 'incorrect code' });
  } catch (err) {
    res.status(500).send({ msg: 'Server Error' });
  }
});

router.post('/reset_password', async (req, res) => {
  let password = req.body.password;
  let email = req.body.email;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    await User.findOneAndUpdate({ email }, { password: hashedpassword });

    res.status(200).send('success');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route GET/api/users/current
//@desc Get current user profile
//@access PRIVATE

// Update User
router.post('/update_user', auth, async (req, res) => {
  let obj = req.body;
  if (obj._id) delete obj._id;
  try {
    await User.findByIdAndUpdate(req.user.id, obj);
    res.status(200).send('success');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/update_clicks/:id', async (req, res) => {
  let obj = req.body;
  const id = req.params.id;

  try {
    const user = await User.findByIdAndUpdate(id, obj, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.get('/vcf/:id', async (req, res) => {
  let { id } = req.params;

  try {
    const user = await User.findById(id);
    var vCardsJS = require('./vcards-js');
    var vCard = vCardsJS();

    if (user._id) vCard.uid = user._id;
    if (user.name) vCard.firstName = user.name;
    if (user.avatarUrl) vCard.photo.attachFromUrl(user.avatarUrl, 'JPEG');
    if (user.email) vCard.email = user.email;
    if (user.social.address.value)
      vCard.homeAddress.city = user.social.address.value;
    if (user.social.phone.value) vCard.cellPhone = user.social.phone.value;
    vCard.url = `https://profilesblue.herokuapp.com/profile/${user._id}`;
    vCard.workUrl = `https://www.instagram.com/${user.social['instagram'].value}`;
    vCard.instagramUrl = `https://www.instagram.com/${user.social['instagram'].value}`;
    // vCard.venmoUrl = `http://venmo.com/${user.social['venmo'].value}`;
    vCard.snapchatUrl = `http://snapchat.com/add/${user.social['snapchat'].value}`;
    vCard.twitterUrl = `http://twitter.com/${user.social['twitter'].value}`;
    vCard.facebookUrl = `http://facebook.com/${user.social['facebook'].value}`;
    vCard.linkedinUrl = `http://linkedin.com/${user.social['linkedin'].value}`;
    vCard.youtubeUrl = `http://youtube.com/${user.social['youtube'].value}`;
    vCard.applemusicUrl = `http://applemusic.com/${user.social['applemusic'].value}`;
    vCard.spotifyUrl = `http://open.spotify.com/add/${user.social['spotify'].value}`;
    vCard.websiteUrl = `http://${user.social['website'].value}`;

    vCard.saveToFile(`./public/${user.email}.vcf`);

    res.download(`./public/${user.email}.vcf`);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
