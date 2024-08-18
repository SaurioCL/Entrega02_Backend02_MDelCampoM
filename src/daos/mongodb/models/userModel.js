import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email:  { type: String, required: true, unique: true },  
  age: { type: Number, require: true },
  password: { type: String, required: true },
  cart: { type: Schema.Types.ObjectId, ref: "cart" },
  role: { type: String, enum: ["admin", "user"], default: 'user'}
},
{
  timestamps: true,
}
);

export const userModel = model('users', userSchema); 
