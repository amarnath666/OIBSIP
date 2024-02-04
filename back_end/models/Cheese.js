import mongoose from "mongoose";

// Define the Cheese schema
const cheeseSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true, 
        default: 20
      },
      img: {
        type: String,  
        required: false  
      } },
      { timestamps: true}
      );

// Create the Cheese model using the schema
const Cheese = mongoose.model('Cheese', cheeseSchema);

export default Cheese;
