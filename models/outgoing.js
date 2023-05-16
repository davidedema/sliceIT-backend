import mongoose from "mongoose";

const outgoingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 30,
    },
    value: {
      type: Number,
      required: true,
    },
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      
    },
    loanedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    description: {
      type: String,
      default: "",
      max: 200,
    },
    isPeriodic: {
      type: Boolean,
      default: false,
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
