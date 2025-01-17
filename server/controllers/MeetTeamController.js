const Mteam = require('../models/MeetTeamModel');
const mongoose = require('mongoose');

//get all Team Details
const getmTeams = async(req, res) => {
    const mTeams = await Mteam.find({}).sort({ createdAt: -1 });

    res.status(200).json(mTeams);
}

//get single Member Details
const getmTeam = async(req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Technician not found" });
        }

        const mTeam = await Mteam.findById(id);
        if (!mTeam) {
            return res.status(404).json({ error: "Technician not found" });
        } else {
            res.status(200).json(mTeam);
        }

    }
    //create new Member Profile
const ceatemTeam = async(req, res) => {
    const {
      technician_name,
      technician_age,
      technician_experiences,
      technician_expertise,
      technician_picture_url,
      technician_specialize_in,
    } = req.body;

    let emptyFields = [];

    //validation for empty fields
    if (!technician_name) {
      emptyFields.push("Name");
    }
    if (!technician_age) {
      emptyFields.push("Age");
    }
    if (!technician_experiences) {
      emptyFields.push("Year Of Experiences");
    }
    if (!technician_expertise) {
      emptyFields.push("Expertice");
    }
    if (!technician_picture_url) {
      emptyFields.push("Technician Image");
    } if (!technician_specialize_in) {
      emptyFields.push("Specialize In");
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields:', emptyFields });
    } 

    //add to db
    try {
        const mTeam = await Mteam.create({
          technician_name,
          technician_age,
          technician_experiences,
          technician_expertise,
          technician_picture_url,
          technician_specialize_in,
        });
        res.status(200).json({ mTeam });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

//delete a vacancy
const deletemTeam = async(req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Technician not found' });
        }
        const mTeam = await Mteam.findOneAndDelete({ _id: id });
        if (!mTeam) {
            return res.status(404).json({ error: "Technician not found" });
        } else {
            res.status(200).json(mTeam);

        }
    }
    //update a vacancy
const updatemTeam = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Technician not found" });
    }
    const mTeam = await Mteam.findOneAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!mTeam) {
        return res.status(404).json({ error: "Technician not found" });
    } else {
        res.status(200).json(mTeam);
    }
}



module.exports = {
    getmTeams,
    getmTeam,
    ceatemTeam,
    deletemTeam,
    updatemTeam

}