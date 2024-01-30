import mongoose from "mongoose";

const veggieSchema = new mongoose.Schema({
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

const Veggie = mongoose.model('Veggie', veggieSchema);

export default Veggie;
