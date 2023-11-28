import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  company: {
    id: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  note: {
    type: String,
    default: "",
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    default: "",
  },
  deleted: {
    type: Boolean,
    default: 0,
  },
  deletedBy: {
    type: String,
    default: "",
  },
  deletedOn: {
    type: Date,
    default: "",
  },
  modifiedBy: {
    type: String,
    default: "",
  },
  modifiedOn: {
    type: Date,
    default: "",
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
