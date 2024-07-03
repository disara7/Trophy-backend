const Coinbank = require('../Database/models/coinbank');
const Challenge = require('../Database/models/challenge');
const Progress = require('../Database/models/progress');
const express = require('express');
const router = express.Router();

const HomeState = async (req, res) => {
    const userId = req.userid; 

    try {
        // Fetch data from the database
        const coinBank = await Coinbank.findOne({ userId: userId });
        const challenges = await Challenge.findOne({ userId: userId });
        const progress = await Progress.findOne({ userId: userId });

        // Prepare response object
        const response = {
            coins: coinBank ? coinBank.noOfCoinsEarned : 0,
            dailyChallenge: challenges ? challenges.dailyChallenge : 0,
            completedChallenges: challenges ? challenges.completedChallenges : 0,
            level: progress ? progress.level : 0,
        };

        // Send response
        res.status(200).json(response);
    } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data' });
    }
};

router.get('/home', HomeState);

module.exports = router;
