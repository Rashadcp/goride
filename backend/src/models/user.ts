import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    googleId: { type: String, unique: true, sparse: true },
    password: String,
    role: {
      type: String,
      enum: ["USER", "DRIVER"],
      default: "USER",
    },
    profilePhoto: String,

    // Driver fields
    numberPlate: String,
    license: String,
    rc: String,
    aadhaar: String,
    vehiclePhoto: String,
    driverStatus: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    resetPasswordOTP: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);