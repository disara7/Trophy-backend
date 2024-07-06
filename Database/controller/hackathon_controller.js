const Hackathon = require("../models/hackathon");

const getHackathons = async (req, res) => {
  try {
    const Hackathons = await Hackathon.find();
    res.status(200).json(Hackathons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getHackathons,
};
