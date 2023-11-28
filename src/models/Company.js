import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  dre: String,
  phoneNumber: String,
  industry: String,
  tier: String,
  logo: String,
  isSubscribed: {
    type: Boolean,
    default: 0,
  },
  isComplimentary: String,
  stripeCustomerId: String,
  notes: String,
  additionalAgentsPackage: String,
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

const Company = mongoose.model("Company", CompanySchema);
export default Company;
