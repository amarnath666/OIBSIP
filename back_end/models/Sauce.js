import mongoose from "mongoose";

const sauceSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true, 
    default: 50 
  },
  img: {
    type: String,  
    required: false  
  }
});

const Sauce = mongoose.model('Sauce', sauceSchema);

export default Sauce;
