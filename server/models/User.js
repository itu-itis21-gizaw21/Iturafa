import mongoose from "mongoose";

const UserSchemax = new mongoose.Schema({ 
   
    createdAt: {
        type: String, 
        default: new Date().toString(),
    },
},{timestamps: true} 
);

const Userx = mongoose.model("Userx", UserSchemax);

export default Userx;