import mongoose from "mongoose";

// Define the Meat schema
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

// Create the Meat model using the schema
const Meat = mongoose.model('Meat', meatSchema);

export default Meat;
