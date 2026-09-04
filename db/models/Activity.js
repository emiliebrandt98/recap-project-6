import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  imageUrl: {
    type: String,
    required: true,
    default: "/placeholder.jpg",
  },
  categories: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Category",
    required: true,
  },
  description: {
    type: String,
  },
  area: {
    type: String,
  },
  country: {
    type: String,
  },
});

export default mongoose.models.Activity ||
  mongoose.model("Activity", ActivitySchema);
