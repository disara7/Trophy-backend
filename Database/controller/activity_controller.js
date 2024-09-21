import Activity from '../models/activity.js';
import { ref, storage, uploadBytes, getDownloadURL } from '../../Firebase/firebase-config.js';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode'

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getActivitiesForUser = async (req, res) => {
  const userId = req.userId; 

  try {
    // Fetch activities where the userId is NOT in registeredEmployees
    const activities = await Activity.find({
      registeredEmployees: { $ne: userId }
    });

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const addActivities = async (req, res) => {
  try {
    const {
      title,
      description,
      coinCount,
      activitiesdetails,
      activitydate,
      activitytime,
      activityvenue,
    } = req.body;
    
    const files = req.files;
    const mainImage = files.find(file => file.fieldname === 'activitiesmainimgUrl');
    const cardImage = files.find(file => file.fieldname === 'imageUrl');
    
    
    let activitiesMainImgUrl = null;
    let cardImgUrl = null;
    let qrCodeUrl = null;
    const uniqueKey = uuidv4(); 

    if (mainImage) {
      const mainImageBuffer = mainImage.buffer;
      const mainImageExtension = mainImage.mimetype.split("/")[1];
      const mainImageName = `activities/main/${uuidv4()}.${mainImageExtension}`;
      const mainImageRef = ref(storage, mainImageName);
      const mainImageSnapshot = await uploadBytes(mainImageRef, mainImageBuffer);
      activitiesMainImgUrl = await getDownloadURL(mainImageSnapshot.ref);
    }

    if (cardImage) {
      const cardImageBuffer = cardImage.buffer;
      const cardImageExtension = cardImage.mimetype.split("/")[1];
      const cardImageName = `activities/cards/${uuidv4()}.${cardImageExtension}`;
      const cardImageRef = ref(storage, cardImageName);
      const cardImageSnapshot = await uploadBytes(cardImageRef, cardImageBuffer);
      cardImgUrl = await getDownloadURL(cardImageSnapshot.ref);
    }

    const qrCodeBuffer = await QRCode.toBuffer(uniqueKey);

    const qrCodeName = `activities/qrcodes/${uniqueKey}.png`;
    const qrCodeRef = ref(storage, qrCodeName);
    const qrCodeSnapshot = await uploadBytes(qrCodeRef, qrCodeBuffer);
    qrCodeUrl = await getDownloadURL(qrCodeSnapshot.ref);

    const newActivity = new Activity({
      title,
      description,
      coinCount,
      activitiesdetails,
      activitydate,
      activitytime,
      activityvenue,
      activitiesmainimgUrl: activitiesMainImgUrl,
      imageUrl: cardImgUrl,
      uniqueKey, 
      qrCodeUrl, 
    });

    await newActivity.save();

    res.status(200).json({ message: "Activity added successfully", newActivity });
  } catch (error) {
    console.error("Error adding activity:", error);
    res.status(500).json({ message: "Failed to add activity", error: error.message });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const activityId = req.params.id;
    console.log(activityId)
    const deletedActivity = await Activity.findByIdAndDelete(activityId);

    if (!deletedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error("Error deleting activity:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getRegisteredUsers = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('registeredEmployees');
    res.json(activity.registeredEmployees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching registered users" });
  }
};

const getQRCode = async (req, res) => {
  try {
    const activityId = req.params.id;

    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    
    const qrCodeUrl = activity.qrCodeUrl;

    if (!qrCodeUrl) {
      return res.status(404).json({ message: 'QR Code not found for this activity' });
    }

    res.status(200).json({ qrCodeUrl, message: 'QR Code retrieved successfully' });
  } catch (error) {
    console.error("Error fetching QR code:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

const compareUniqueKey = async (req, res) => {
  const activityId = req.params.id; 
  const userId = req.userId;

  try {
    const { uniqueKey } = req.body; 

    // Find the activity using the activityId
    const activity = await Activity.findOne({ _id: activityId });
    
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Compare the unique key with the one in the request body
    if (activity.uniqueKey === uniqueKey) {
      if (activity.registeredEmployees.includes(userId)) {
        return res.status(400).json({ message: 'User already collected this activity' });
      }
      // Add the userId to the registeredEmployees array
      activity.registeredEmployees.push(userId);
      await activity.save();
      return res.status(200).json({ message: 'Unique key matched' });
    } else {
      return res.status(400).json({ message: 'Unique key does not match' });
    }
  } catch (error) {
    console.error("Error comparing unique key:", error);
    res.status(500).json({ message: 'Server error' });
  }
};



export default { getActivities, addActivities, deleteActivity, getRegisteredUsers, getQRCode, compareUniqueKey, getActivitiesForUser };
