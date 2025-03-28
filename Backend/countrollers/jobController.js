    const Job = require('../models/Job');

    // Controller function to handle job creation
    const createJob = async (req, res) => {
    try {
        const { title, company, location, salary, type, skills, description } = req.body;

        // Create a new job
        const newJob = new Job({
        title,
        company,
        location,
        salary,
        type,
        skills,
        description,
        });

        // Save the job to the database
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(400).json({ error: 'Failed to create job' });
    }
    };

    const getJobs = async (req, res) => {
        try {
          // Fetch all jobs from the database
          const jobs = await Job.find();
      
          // Return the list of jobs
          res.status(200).json(jobs);
        } catch (error) {
          console.error('Error fetching jobs:', error);
          res.status(500).json({ error: 'Failed to fetch jobs' });
        }
      };

    module.exports = { createJob, getJobs };
