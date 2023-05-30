import mongoose from "mongoose";

const outgoingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 30,
    },
    description: {
      type: String,
      default: "",
      max: 200,
    },
    value: {
      type: Number,
      required: true,
    },
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    users: [
      {
        user:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        value: {
          type: Number,
          required: true,
        }
      }
    ],
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    periodicity: {
      isPeriodic: {
        type: Boolean,
        default: false,
      },
      days: {
        type: Number,
        default: 0,
      },
    },
    tag: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Outgoing = mongoose.model("Outgoing", outgoingSchema);
export default Outgoing;
