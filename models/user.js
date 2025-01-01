import mongoose, { Schema, models } from "mongoose";
import bcrypt from "bcryptjs";

// Define the schema for the User model
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,  // Enforce minimum length for the name
    },
    email: {
      type: String,
      required: true,
      unique: true,  // Ensure emails are unique in the collection
      lowercase: true, // Automatically convert email to lowercase
      match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 'Please provide a valid email address'],  // Validate email format
    },
    password: {
      type: String,
      required: true,
      minlength: 6,  // Enforce minimum password length
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  // Check if password has been modified or is a new user
  if (!this.isModified("password")) return next();

  // Hash the password with bcrypt before saving it
  const salt = await bcrypt.genSalt(10); // You can adjust the salt rounds as needed
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Method to compare the password during login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create the model if it doesn't exist already (for reusability in serverless environments)
const User = models.User || mongoose.model("User", userSchema);

export default User;
