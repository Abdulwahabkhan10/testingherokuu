const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  views: { type: Number, default: 0 },
  // ipOfUsersThatRequestedYourProfile: [{ type: String, default: null }],
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avatarUrl: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
  },
  resetCode: String,
  social: {
    instagram: {
      value: String,
      clicks: Number,
    },
    venmo: {
      value: String,
      clicks: Number,
    },
    snapchat: {
      value: String,
      clicks: Number,
    },
    whatsapp: {
      value: String,
      clicks: Number,
    },
    phone: {
      value: String,
      clicks: Number,
    },
    twitter: {
      value: String,
      clicks: Number,
    },
    facebook: {
      value: String,
      clicks: Number,
    },
    linkedin: {
      value: String,
      clicks: Number,
    },
    youtube: {
      value: String,
      clicks: Number,
    },
    pinterest: {
      value: String,
      clicks: Number,
    },
    applemusic: {
      value: String,
      clicks: Number,
    },
    spotify: {
      value: String,
      clicks: Number,
    },
    paypal: {
      value: String,
      clicks: Number,
    },
    soundcloud: {
      value: String,
      clicks: Number,
    },
    website: {
      value: String,
      clicks: Number,
    },
    link: {
      value: String,
      clicks: Number,
    },
    s_email: {
      value: String,
      clicks: Number,
    },
    address: {
      value: String,
      clicks: Number,
    },
  },
});

module.exports = User = mongoose.model('user', UserSchema);
