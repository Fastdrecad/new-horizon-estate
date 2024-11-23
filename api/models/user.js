import mongoose from "mongoose";
import Listing from "./listing.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
    }
  },
  { timestamps: true }
);

// Pre-delete middleware to remove all user's listings
userSchema.pre("remove", async function (next) {
  try {
    await Listing.deleteMany({ userRef: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
