import mongoose from "mongoose";    

const groupSchema = new mongoose.Schema({   //creare lo schema per il gruppo   
    name: {   //nome del gruppo
        type: String,
        required: true,
        max: 30,
    },
    descriprion: {   //descrizione del gruppo
        type: String,
        default: "",
        max: 200
    },
    groupPicture: {   //immagine del gruppo
        type: String,
        default: "",
    },
    inviteLink: {  //link per invitare altri utenti
        type: String,
        required: true,
        unique: true,
    },
    members: [{   //membri del gruppo
        type: mongoose.Schema.Types.ObjectId,   //id dell'utente
        ref: 'User',
    }],
    outgoings: [{  //spese del gruppo
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'Outgoing',
    }],
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
