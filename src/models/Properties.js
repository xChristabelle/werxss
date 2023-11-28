import mongoose from "mongoose";

const PropertiesSchema = new mongoose.Schema({
  userId: String,
  mlsNumber: String,
  transactionType: String,
  propertyType: String,
  propertyStatus: String, 
  street: String,
  city: String,
  state: {
    name: String,
    abbr: String
  },
  postalCode: String,
  country: {
    type: String,
    default: "United States of America"
  },
  salesPrice: String,
  units: String,
  commission: String,
  bonus: String,
  source: String,
  transactionCoordinatorFee: String,
  splitPaid: String,
  officeFees: String,
  agentId: String,
  escrowCompany: String,
  mortgageCompany: String,
  contractStartDate: Date,
  contractExpirationDate: Date,
  openEscrowDate: Date,
  closingDate: Date,
  image: String,
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

const Properties = mongoose.model("Properties", PropertiesSchema);
export default Properties;
