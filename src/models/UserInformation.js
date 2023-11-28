import mongoose from "mongoose";

const UserInformationSchema = new mongoose.Schema({
  userId: String,

  // Personal Information
  firstName: {
    type: String,
    default: "",
  },
  middleName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  address: [
    {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      type: String,
    },
  ],
  phoneNumber: String,
  countryCode: String,
  languages: [String],
  bio: [String],

  // Employment Information

  dre: String,
  joinRealEmail: String,
  licenses: [
    {
      name: String,
      number: String,
      issuingAuthority: String,
      expirationDate: Date,
      complaints: String,
      status: String,
    },
  ],
  mls: [
    {
      state: String,
      name: String,
    },
  ],
  board: [{ state: String, name: String }],
  website: String,
  sponsorLink: String,
  shareworksId: String,
  department: {
    departmentId: String,
    name: String,
    description: String,
  },
  teams: String,
  manager: {
    name: String,
    email: String,
    phoneNumber: String,
  },
  specialties: [String],
  position: String,
  hireDate: Date,
  endDate: Date,

  // Emergency Contact Information

  emergencyContact: [
    {
      name: String,
      relationship: String,
      phoneNumber: String,
      email: String,
    },
  ],

  // Salary and Benefits Information

  salary: {
    baseSalary: Number,
    bonuses: [Number],
  },
  benefits: [String],

  // Account Status Information

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

const UserInformation = mongoose.model(
  "UserInformation",
  UserInformationSchema
);
export default UserInformation;
