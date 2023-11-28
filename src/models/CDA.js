import mongoose from "mongoose";

const CDASchema = new mongoose.Schema({
  adminId: String,
  agentId: String,
  name: String,
  document: {
    fileURL: {
      type: String,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  },
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

const CDA = mongoose.model("CDA", CDASchema);
export default CDA;

//Commission Disbursement Authorization
