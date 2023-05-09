import mongoose from "mongoose";

const outgoingSchema = new mongoose.Schema({
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
        ref: 'User',
        required: true,
    },
    components: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
    },
    isPeriodic: {
        type: Boolean,
        default: false,
    },
    tag: {
        type: String,
        default: "",
    },
}, { timestamps: true }
);

const Outgoing = mongoose.model('Outgoing', outgoingSchema);
export default Outgoing;