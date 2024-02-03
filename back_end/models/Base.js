import mongoose from "mongoose";

const baseSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true, 
        default: 30
      },
      img: {
        type: String,  
        required: false  
      },
    },
    { timestamps: true});

const Base = mongoose.model('Base', baseSchema);

export default Base;
