import mongoose from "mongoose";

const NewsfeedSchema = new mongoose.Schema({
  userId: String,
  username: String,
  parentId: String,
  body: String,
  image: String,
  company: {
    id: String,
    name: String,
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

const Newsfeed = mongoose.model(
  "Newsfeed",
  NewsfeedSchema
);
export default Newsfeed;
