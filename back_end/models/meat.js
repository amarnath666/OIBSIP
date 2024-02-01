import mongoose from "mongoose";

const meatSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true, 
        default: 30 
      },
    },
    { timestamps: true}
    );

const Meat = mongoose.model('Meat', meatSchema);

export default Meat;
