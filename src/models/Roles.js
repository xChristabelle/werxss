import mongoose from "mongoose";

const RolesSchema = new mongoose.Schema({
  name: String, 
  description: String,
  company: {
    id: String,
    name: String
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

const Roles = mongoose.model("Roles", RolesSchema);
export default Roles;

// ["user", "admin", "superadmin"],