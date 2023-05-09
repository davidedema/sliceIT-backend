import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        nickname: {
            type: String,
            required: true,
            min: 3,
            max: 30,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 16
        },
        firstName: {
            type: String,
            default: "",
            min: 3,
            max: 30
        },
        lastName: {
            type: String,
            default: "",
            min: 3,
            max: 30
        },
        profilePicture: {
            type: String,
            default: ""
        },
        groups: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
        }],
        outgoings: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Outgoing',
        }],
    }, { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;    