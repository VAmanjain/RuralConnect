const Skills = require("../models/Skill");

const addSkill = async (req, res) => {
    const { userId, skills } = req.body;
  
    // if (!userId || !skills || !Array.isArray(Skills)) {
    //   return res.status(400).json({ error: 'User ID and skills array are required.' });
    // }
  
    try {
      const newSkills = new Skills({ userId, skills });
      await newSkills.save();
      res.status(201).json(newSkills);
    } catch (error) {
      console.error('Error adding skills:', error);
      res.status(500).json({ error: 'Failed to add skills.' });
    }
  }

  module.exports ={ addSkill}