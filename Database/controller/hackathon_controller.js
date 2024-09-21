import Hackathon from '../models/hackathon.js';
import { v4 as uuidv4 } from 'uuid';
import { ref, storage, uploadBytes, getDownloadURL } from '../../Firebase/firebase-config.js';

const getHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    res.status(200).json(hackathons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addHackathon = async (req, res) => {
  try {
    const {
      hacktitle,
      hackdescription,
      hackcoinCount,
      hackathondetails,
    } = req.body;

    const hackImage = req.files?.hackimage?.[0];
    const hackMainImage = req.files?.hackmainimage?.[0];

    let hackImageUrl = null;
    let hackMainImgUrl = null;

    // Upload hack image to Firebase Storage
    if (hackImage) {
      const hackImageBuffer = hackImage.buffer;
      const hackImageExtension = hackImage.mimetype.split("/")[1];
      const hackImageName = `hackathons/images/${uuidv4()}.${hackImageExtension}`;
      const hackImageRef = ref(storage, hackImageName);
      const hackImageSnapshot = await uploadBytes(hackImageRef, hackImageBuffer);
      hackImageUrl = await getDownloadURL(hackImageSnapshot.ref);
    }

    // Upload main image to Firebase Storage
    if (hackMainImage) {
      const hackMainImageBuffer = hackMainImage.buffer;
      const hackMainImageExtension = hackMainImage.mimetype.split("/")[1];
      const hackMainImageName = `hackathons/main/${uuidv4()}.${hackMainImageExtension}`;
      const hackMainImageRef = ref(storage, hackMainImageName);
      const hackMainImageSnapshot = await uploadBytes(hackMainImageRef, hackMainImageBuffer);
      hackMainImgUrl = await getDownloadURL(hackMainImageSnapshot.ref);
    }

    // Create a new hackathon document using the mongoose model
    const newHackathon = new Hackathon({
      hacktitle,
      hackdescription,
      hackcoinCount,
      hackathondetails,
      hackimageUrl: hackImageUrl, 
      hackathonmainimgUrl: hackMainImgUrl, 
    });

    // Save the hackathon in MongoDB
    await newHackathon.save();

    res.status(200).json({ message: "Hackathon added successfully", newHackathon });
  } catch (error) {
    console.error("Error adding hackathon:", error);
    res.status(500).json({ message: "Failed to add hackathon", error: error.message });
  }
};

const deleteHackathon = async (req, res) => {
  try {
    const hackathonId = req.params.id; 

    // Attempt to delete the Hackathon
    const deletedHackathon = await Hackathon.findByIdAndDelete(hackathonId);

    if (!deletedHackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }

    // Respond with success message
    res.status(200).json({ message: 'Hackathon deleted successfully' });
  } catch (error) {
    console.error("Error deleting hackathon:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default { getHackathons, addHackathon, deleteHackathon };
