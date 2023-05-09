import Group from '../models/group.js';
import User from '../models/user.js';

/*FUNZIONE CHE GENERA UN LINK D'INVITO UNIVOCO*/
function generateInviteLink() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let inviteLink = '';
    for (let i = 0; i < 20; i++) {
      inviteLink += characters[Math.floor(Math.random() * characters.length)];
    }
    return inviteLink;
}

/*CREARE UN GRUPPO*/
export const createGroup = async (req, res) => { 
    try {     
        const { 
            name,
            descriprion,
            groupPicture
        } = req.body; 
        const inviteLink = generateInviteLink();
        const group = new Group({ name, descriprion, groupPicture, inviteLink });
        await group.save(); 
        res.status(201).json({ group });
        } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
};

/*UNIRSI AD UN GRUPPO TRAMITE LINK INVITO*/
export const joinGroup = async (req, res) => { 
    try {
      const { inviteLink } = req.params;
      const group = await Group.findOne({ inviteLink });
      if (!group) {
        res.status(404).send('Group not found');
        return;
      }
      if (group.members.includes(req.user._id)) {
        res.status(400).send('User already a member of the group');
          return;
      }
      group.members.push(req.user._id);
      await group.save();
      res.json({ group });
      } catch (error) {
          console.error(error);
          res.status(500).send('Internal server error');
      }
};
