import mongoose from "mongoose";

const EventsSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  image: String,
  company: {
    id: String,
    name: String,
  },
  eventDate: Date,
  startTime: Date,
  endTime: Date,
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

const Events = mongoose.model("Events", EventsSchema);
export default Events;
