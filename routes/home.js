import Coinbank from '../Database/models/coinbank.js';
import Challenge from '../Database/models/challenge.js';
import Progress from '../Database/models/progress.js';
import express from 'express';
const router = express.Router();

import { verifyToken } from '../authHelpers.js';

const HomeState = async (req, res) => {
    const userId = req.userId; 

    try {
        // Fetch data from the database
        const coinBank = await Coinbank.findOne({ userId });
        const challenges = await Challenge.findOne({ userId });
        const progress = await Progress.findOne({ userId });

        // Prepare response object
        const response = {
            coins: coinBank ? coinBank.noOfCoinsEarned : 0,
            dailyChallenge: challenges ? challenges.dailyChallenge : 0,
            completedChallenges: challenges ? challenges.completedChallenges : 0,
            level: progress ? progress.level : 0,
        };

        // Send response
        return res.status(200).json(response);
    } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
        return res.status(500).json({ message: 'Error fetching data ${userId}' });
    }
};

router.get('/home',verifyToken, HomeState);

export default router;
