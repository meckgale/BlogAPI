const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET; // Define this in your .env file

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      console.log("JWT Payload:", jwt_payload); // Log to see what you're receiving
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => {
          console.error("Error during user retrieval:", err);
          done(err, false);
        });
    })
  );
};
