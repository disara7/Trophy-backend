import Sport from '../models/sport.js';

const getSports = async (req, res) => {
  try {
    const sports = await Sport.find();
    res.status(200).json(sports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { getSports };