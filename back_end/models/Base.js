import mongoose from "mongoose";

// Define the Base schema
const baseSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true, 
    },
    quantity: { 
        type: Number, 
        required: true,
        default: 20, 
    },
    img: {
        type: String,  
        required: false, 
    },
}, { 
    timestamps: true, 
});

// Create the Base model using the schema
const Base = mongoose.model('Base', baseSchema);

export default Base;
