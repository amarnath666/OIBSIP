import mongoose from "mongoose";

const veggieSchema = new mongoose.Schema({
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
      { timestamps: true}
    );

const Veggie = mongoose.model('Veggie', veggieSchema);

export default Veggie;
