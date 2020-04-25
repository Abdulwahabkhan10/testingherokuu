const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
router.get('/current', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  POST/api/auth
//@desc    Login user
//@access  Public
router.post(
  '/login',
  [
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    // See if user exist
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ errors: { msg: 'Invalid Email' } });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ errors: 'Invalid Password' });
      }

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
  }
);

// @route  POST/api/forget
//@desc    Forget Password
//@access  Public
router.post('/reset-password', async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      res
        .status(400)
        .json({ errors: { msg: 'There is no user for this email' } });
    }
  } catch (err) {}
});

module.exports = router;
