import mongoose from "mongoose";

const entrySchema = new mongoose.Schema(
  {
    pharmacy: {
      type: String,
      required: true,
    },

    contact: {
      type: String,
      required: true,
    },

    person: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["accepted", "denied"],
      required: true,
    },

    remarks: [
      {
        text: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    area: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const entryModel = mongoose.model("entry", entrySchema);
