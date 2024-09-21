import Sport from '../models/sport.js';
import { v4 as uuidv4 } from 'uuid';
import { ref, storage, uploadBytes, getDownloadURL } from '../../Firebase/firebase-config.js';

const getSports = async (req, res) => {
  try {
    const sports = await Sport.find();
    res.status(200).json(sports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addSport = async (req, res) => {
  try {
    const {
      sporttitle,
      sportdescription,
      sportcoinCount,
      sportdetails,
      type,
      sportimageUrl
    } = req.body;

    const sportMainImage = req.file; 

    let sportMainImgUrl = null;

    // Upload main image to Firebase Storage
    if (sportMainImage) {
      const sportMainImageBuffer = sportMainImage.buffer;
      const sportMainImageExtension = sportMainImage.mimetype.split("/")[1];
      const sportMainImageName = `sports/main/${uuidv4()}.${sportMainImageExtension}`;
      const sportMainImageRef = ref(storage, sportMainImageName);
      const sportMainImageSnapshot = await uploadBytes(sportMainImageRef, sportMainImageBuffer);
      sportMainImgUrl = await getDownloadURL(sportMainImageSnapshot.ref);
    }

    // Create a new sport document using the mongoose model
    const newSport = new Sport({
      sporttitle,
      sportdescription,
      sportimageUrl,
      sportcoinCount,
      sportdetails,
      sportmainimgUrl: sportMainImgUrl,
      type,
    });

    // Save the sport in MongoDB
    await newSport.save();

    res.status(200).json({ message: "Sport added successfully", newSport });
  } catch (error) {
    console.error("Error adding sport:", error);
    res.status(500).json({ message: "Failed to add sport", error: error.message });
  }
};

const deleteSport = async (req, res) => {
  try {
    const sportId = req.params.id; 

    const deletedSport = await Sport.findByIdAndDelete(sportId);

    if (!deletedSport) {
      return res.status(404).json({ message: 'Sport not found' });
    }

    res.status(200).json({ message: 'Sport deleted successfully' });
  } catch (error) {
    console.error("Error deleting sport:", error);
    res.status(500).json({ message: 'Server error' });
  }
};


const unApprovedUsers = async (req, res) => {
  const { sportId } = req.params;

  try {
    const sport = await Sport.findById(sportId);

    if (!sport) {
      return res.status(404).json({ message: "Sport not found" });
    }

    // Filter unapproved users
    const unapprovedUsers = sport.registeredUsers.filter(
      (user) => !user.isApproved
    );

    res.json(unapprovedUsers);
  } catch (error) {
    console.error("Error fetching unapproved users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const approveUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const sport = await Sport.findOne({
      "registeredUsers.employeeId": userId,
    });

    if (!sport) {
      return res.status(404).json({ message: "Sport or user not found" });
    }

    const user = sport.registeredUsers.find(
      (user) => user.employeeId.toString() === userId
    );

    if (!user) {
      return res.status(404).json({ message: "User not found in this sport" });
    }

    user.isApproved = true;

    await sport.save();

    res.status(200).json({ message: "User approved successfully" });
  } catch (error) {
    console.error("Error approving user:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export default { getSports, addSport, deleteSport, unApprovedUsers, approveUser };