import mongoose from "mongoose";

const CompanyGoalsSchema = new mongoose.Schema({
  alertgentId: String,
  closingGoal: String,
  volumeGoal: String,
  start: String,
  end: String,
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

const CompanyGoals = mongoose.model("CompanyGoals", CompanyGoalsSchema);
export default CompanyGoals;
