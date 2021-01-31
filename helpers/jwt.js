const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return (access_token = jwt.sign(payload, "studyprojectsecret", {
    expiresIn: 120 * 120,
  }));
}

function verifyToken(access_token) {
  return jwt.verify(access_token, "studyprojectsecret");
}

module.exports = {
  generateToken,
  verifyToken,
};
