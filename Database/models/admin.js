import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    companyName: {
        type: String,
    },
    password: {
        type: String
    },
    email: {    
        type: String
    }
});

const Admin = mongoose.model("Admin", adminSchema)
export default Admin;