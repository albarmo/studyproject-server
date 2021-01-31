const { User } = require("../models/index");
const { uuid } = require("uuidv4");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const uploader = require("../helpers/uploader");

class UserController {
  // asyncronus base register
  static async register(req, res) {
    let generateUUID = uuid();
    let userRegisterData = {
      id: generateUUID,
      fullname: req.body.fullname,
      profile_image: req.body.profile_image,
      phone_number: req.body.phone_number,
      email: req.body.email,
      gender: req.body.gender,
      class: req.body.class,
      school: req.body.school,
      password: req.body.password,
    };
    try {
      let createUser = await User.create(userRegisterData, {
        returning: true,
        plain: true,
      });
      res.status(201).json(createUser);
    } catch (error) {
      // destructturing objects
      let { errors } = error;
      // destructuring arrays
      let [details] = errors;
      res.status(500).json({
        message: details.message,
        email: details.instance.email,
        type: details.validatorKey,
      });
    }
  }

  static registered(req, res) {
    let generateUUID = uuid();
    try {
      const upload = uploader("USERSIMAGE").fields([{ name: "profile_image" }]);
      upload(req, res, (err) => {
        if (err) {
          console.log("gagal upload", err);
          return res.status(500).json({ msg: err });
        }
        const { profile_image } = req.files;
        const imagePath = profile_image
          ? "/" + profile_image[0].filename
          : null;
        let registerData = {
          id: generateUUID,
          fullname: req.body.fullname,
          profile_image: imagePath,
          phone_number: req.body.phone_number,
          email: req.body.email,
          gender: req.body.gender,
          class: req.body.class,
          school: req.body.school,
          password: req.body.password,
        };
        User.create(registerData)
          .then((data) => {
            return res.status(201).json({ msg: "success created new user" });
          })
          .catch((error) => {
            return res.status(500).json({ msg: "error created user" });
          });
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }

  // async base login
  static async login(req, res) {
    const inputLoginData = {
      email: req.body.email,
      password: req.body.password,
    };

    const user = await User.findOne({ where: { email: inputLoginData.email } });
    try {
      if (!user) {
        return res.status(401).json({ msg: "email or password wrong!" });
      } else if (!comparePassword(inputLoginData.password, user.password)) {
        return res.status(401).json({ msg: "email or password wrong!" });
      } else {
        let access_token = generateToken({
          email: user.email,
          fullname: user.fullname,
        });
        res.status(200).json({
          access_token,
          fullname: user.fullname,
          coins: user.coins,
          school: user.school,
          email: user.email,
          role: user.role,
          class: user.class,
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getUserList(req, res) {
    let userList = await User.findAll();
    try {
      if (!userList) {
        return res.status(404).json("user data empty");
      } else {
        return res.status(200).json({ userList });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
