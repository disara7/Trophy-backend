import Coinbank from "../models/coinbank.js";
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



export default { getCoinCount };