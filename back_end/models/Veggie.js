import mongoose from "mongoose";

// Define the Veggie schema
const veggieSchema = new mongoose.Schema({
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
      },
    },
      { timestamps: true}
    );

// Create the Veggie model using the schema
const Veggie = mongoose.model('Veggie', veggieSchema);

export default Veggie;
