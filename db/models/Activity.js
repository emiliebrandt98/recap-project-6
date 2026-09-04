import mongoose from "mongoose";
import "./Category";

const { Schema } = mongoose;

const ActivitySchema = new Schema({
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
    id: { type: [Schema.Types.ObjectId], ref: "Category" },
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
