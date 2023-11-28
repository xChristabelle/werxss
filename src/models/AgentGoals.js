import mongoose from "mongoose";

const AgentGoalsSchema = new mongoose.Schema({
  agentId: String,
  closingGoal: {
    type: String,
    default: "",
  },
  volumeGoal: {
    type: String,
    default: "",
  },
  start: {
    type: String,
    default: "",
  },
  end: {
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

const AgentGoals = mongoose.model("AgentGoals", AgentGoalsSchema);
export default AgentGoals;
