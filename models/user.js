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
            max: 20,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        firstName: {
            type: String,
            default: "",
            min: 3,
            max: 20
        },
        lastName: {
            type: String,
            default: "",
            min: 3,
            max: 20
        },
        profilePicture: {
            type: String,
            default: ""
        }
    }, { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;