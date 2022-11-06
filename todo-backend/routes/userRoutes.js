const express = require("express");
const userModal = require("../modals/userModal");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const router = express.Router();
const secret = "TODOAPP";


router.post("/register", body("username").isString(), body("password").isLength({
  min: 6,
  max: 16
}
), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "failed", message: "password should be minimum 6 chracter , max 16" });
    }

    const { username, password } = req.body;

    bcrypt.hash(password, 10, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        res.status(500).json({
          status: "failed",
          message: "password should be minimum 6 chracter , max 16"
        })
      }
      const chkuser = await userModal.find({ username })
      if (chkuser.length > 0) {
        return (
          res.status(400).json({
            status: "failed",
            message: "user already registered please login"
          })
        )
      }
      const user = await userModal.create({
        username,
        password: hash
      });
      if (user) {
        res.json({
          status: "sucess",
          message: "Registration successful"
        })
      }
    });

  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: "password should be minimum 6 chracter , max 16"
    });
  }
});

router.post("/login", body("username"), body("password"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, password } = req.body;
      const data = await userModal.findOne({ username });
      if (!data) {
        return res.status(400).json({
          status: "failed",
          message: "User is not registerd"
        })
      }

      const validpwd = await bcrypt.compare(password, data.password)
      if (!validpwd) {
        return res.status(500).json({
          status: "failed",
          message: "wrong password"
        })
      }

      if (validpwd) {
        const token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (3660 * 3660),
          data: data._id
        }, secret);

        res.json({
          status: "Sucess",
          token,
          username: data.username
        });
      }


    } catch (e) {
      res.status(500).json({
        status: "failed",
        message: e.message
      });
    };
  });

module.exports = router;