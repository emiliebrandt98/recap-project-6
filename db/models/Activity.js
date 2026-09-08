import mongoose from "mongoose";
import "./Category";

const { Schema } = mongoose;

const ActivitySchema = new Schema(
  {
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
      type: [Schema.Types.ObjectId],
      ref: "Category",
      required: true,
      validate: [
        {
          validator: (val) => val.length >= 1,
          message: "Bitte wähle mindestens 1 Kategorie aus.",
        },
        {
          validator: (val) => val.length <= 3,
          message: "Du kannst maximal 3 Kategorien auswählen.",
        },
      ],
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
  },
  { timestamps: true }
);

export default mongoose.models.Activity ||
  mongoose.model("Activity", ActivitySchema);
