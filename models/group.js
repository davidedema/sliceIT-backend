import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({   
    name: {   
        type: String,
        required: true,
        max: 30,
    },
    descriprion: {   
        type: String,
        default: "",
        max: 200
    },
    groupPicture: {   
        type: String,
        default: "",
    },
    inviteLink: {  
        type: String,
        required: true,
        unique: true,
    },
    members: [{   
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User',
    }],
    outgoings: [{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Outgoing',
    }],
}, { timestamps: true }
);

const Group = mongoose.model('Group', groupSchema);
export default Group;
