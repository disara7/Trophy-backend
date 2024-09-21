import Coinbank from "../models/coinbank.js";
import Progress from '../models/progress.js';

const targetPoints = [1000, 5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000];

const getCoinCount = async (req, res, next) => {
    const userId = req.userId;

    try {
        const coinData = await Coinbank.findOne({ userId }, 'noOfCoinsEarned'); 
        
        if (!coinData) {
            return res.status(404).json({ coinCount: 0 }); 
        }
        
        res.status(200).json({ coinCount: coinData.noOfCoinsEarned }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addCoin = async (req, res) => {
    const userId = req.userId;
    const { amount } = req.body;

    try {
        // Check if the Coinbank document exists for the user
        let coinData = await Coinbank.findOne({ userId });

        // Update or create the Coinbank document
        if (!coinData) {
            const newCoinData = new Coinbank({
                userId,
                noOfCoinsEarned: amount + 100,
            });
            await newCoinData.save();
        } else {
            coinData.noOfCoinsEarned += amount;
            await coinData.save();
        }

        // Update the Progress 
        let progressData = await Progress.findOne({ userId });
        if (!progressData) {
            const newProgressData = new Progress({
                userId,
                progressPoint: amount,
            });
            await newProgressData.save();
        } else if(progressData.targetPoint < progressData.progressPoint) {
            progressData.progressPoint += amount;
            await progressData.save();
        } else {
            progressData.progressPoint += amount;
            progressData.progressPoint -= progressData.targetPoint;
            progressData.targetPoint = targetPoints[progressData.level+1];
            progressData.level = 1;
            
            await progressData.save();
        }

        return res.status(200).json({ message: 'Coins and progress updated successfully' });
    } catch (error) {
        console.error("Error adding coins:", error);
        return res.status(500).json({ message: 'Server error' });
    }
};




export default { getCoinCount, addCoin };