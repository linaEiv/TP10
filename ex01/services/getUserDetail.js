const Users = require("../models/users");

const getUserDetails = async (req, res) => {
    await res.json(req.userData);
  };

module.exports = {
    getUserDetails
}