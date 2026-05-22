import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
  {
    selectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },

    entry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "entry"
    },
    phone: {
      type: String
    },

    visitDate: {
      type: String,
      required: true
    },

    visitTime: {
      type: String,
      required: true
    },
    visitStatus:{
      type:String,
      enum:[
        "pending",
        "completed",
        "cancelled"
      ],
      default:"pending"
    },
  },
  {
    timestamps: true
  });
export const visitModel = mongoose.model("visit", visitSchema);