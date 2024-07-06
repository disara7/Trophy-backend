const Hackathon = require("../models/hackathon");

const getHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    res.status(200).json(hackathons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getHackathons,
};
