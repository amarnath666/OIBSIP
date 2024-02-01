import mongoose from "mongoose";

const cheeseSchema = new mongoose.Schema({
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
      } },
      { timestamps: true}
      );

const Cheese = mongoose.model('Cheese', cheeseSchema);

export default Cheese;
