import mongoose from "mongoose";

// Define the Sauce schema
const sauceSchema = new mongoose.Schema({
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
  }},
  { timestamps: true}
  );

// Create the Sauce model using the schema
const Sauce = mongoose.model('Sauce', sauceSchema);

export default Sauce;
