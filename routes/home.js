const Coinbank = require('../Database/models/coinbank');
const Challenge = require('../Database/models/challenge');
const Progress = require('../Database/models/progress');
const express = require('express');
const router = express.Router();



const HomeState = async (req, res) => {
    const userId = req.userid; 
  
    try {
      const coinBank = await Coinbank.findOne({ userId: userId });
      const challenges = await Challenge.findOne({ userId: userId });
      const progress = await Progress.findOne({ userId: userId });
  
      res.json({
        coins: coinBank ? coinBank.noOfCoinsEarned : 0,
        dailyChallenge: challenges ? challenges.dailyChallenge : 0,
        completedChallenges: challenges ? challenges.completedChallenges : 0,
        level: progress ? progress.level : 0,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
    }
  }

router.post('/home', HomeState);

module.exports = router;
