import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from the beginning and end of the string
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email uniqueness
    trim: true,
    lowercase: true, // Automatically convert emails to lowercase
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // You might want a minimum length for password security
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const User = mongoose.model("User", userSchema);
export default User;
