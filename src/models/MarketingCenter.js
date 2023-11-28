import mongoose from "mongoose";

const MarketingCenterSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  image: String,
  company: {
    id: String,
    name: String,
  },
  active: {
    type: Boolean,
    default: 1,
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

const MarketingCenter = mongoose.model("MarketingCenter", MarketingCenterSchema);
export default MarketingCenter;
