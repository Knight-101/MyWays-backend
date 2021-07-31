const User = require("../models/User");
const dotenv = require("dotenv");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();

const saltRounds = 10;

exports.postRegistrationData = async (req, res) => {
  // validate the data. The joi.validate thing send error as the 1st object in its response and there is also a message in the details.
  const { error } = registerValidation(req.body);
  if (error) {
    return res.send(error.details[0].message);
  } else {
    //check if email already exists
    User.findOne({ email: req.body.email }, async (err, foundEmail) => {
      if (foundEmail) {
        res.send("Email already exists");
      } else {
        bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
          //create a user
          const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hash,
            permission: false,
          });
          try {
            await user.save();
            const token = jwt.sign(
              { email: req.body.email },
              process.env.TOKEN_SECRET,
              {
                expiresIn: "3hr",
              }
            );

            res.json({ ok: 1, token: token });
          } catch (err) {
            res.status(400).send(err);
          }
        });
      }
    });
  }
};

exports.postLoginData = async (req, res) => {
  //lets validate the data. The joi.validate thing send error as the 1st object in its response and there is also a message in the details.
  const { error } = loginValidation(req.body);
  if (error) {
    return res.send(error.details[0].message);
  } else {
    //check if email doesn't exist
    User.findOne({ email: req.body.email }, async (err, foundUser) => {
      const email = req.body.email;
      if (!foundUser) {
        res.send("Email doesn't match our records");
      } else {
        //check password
        bcrypt.compare(
          req.body.password,
          foundUser.password,
          function (err, result) {
            if (result) {
              const token = jwt.sign(
                { email: email },
                process.env.TOKEN_SECRET,
                {
                  expiresIn: "3hr",
                }
              );
              res.json({ token: token, user: foundUser });
            } else {
              res.send("invalid password");
            }
          }
        );
      }
    });
  }
};
