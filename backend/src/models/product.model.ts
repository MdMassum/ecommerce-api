import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  category?: string;
  stock: number;
  user?:Schema.Types.ObjectId
}

const productSchema = new Schema<IProduct>(
  {
    name: { 
        type: String, 
        required: true, 
        text: true 
    },
    description: { 
        type: String, 
        text: true 

    },
    price: { 
        type: Number, 
        required: true 
    },
    stock: { 
        type: Number, 
        default: 0 
    },
    category: String,
    user:{
        type:mongoose.Schema.ObjectId,
        ref : "User",
        // required:true,
    }
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
