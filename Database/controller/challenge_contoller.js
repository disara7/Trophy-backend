const Challenge = require('../models/challenge');

const addChallenge = (req, res, next) => {
  const newChallenge = new Challenge({
    userId: req.body.userId,
    dailyChallenge: req.body.dailyChallenge,
    completedChallenges: req.body.completedChallenges,
  });
  newChallenge.save()
    .then((savedChallenge) => {
      res.status(201).json(savedChallenge);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

exports.addChallenge = addChallenge;