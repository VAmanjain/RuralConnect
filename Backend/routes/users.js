// routes/users.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();



router.post('/signup', async (req, res) => {
    const { name, email, password, accountType } = req.body;
    try {
        const newUser = new User({ name, email, password, accountType });
        await newUser.save();
        console.log(newUser);
        
        // Return the user's ID along with a success message
        res.status(201).json({ 
            message: 'User created successfully', 
            userId: newUser._id 
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login route
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: 'No user found' });

//         const isMatch = await user.comparePassword(password);
//         if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

//         // Generate JWT token
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.status(200).json({ token });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Protected route example (optional)
// router.get('/profile', async (req, res) => {
//     const token = req.headers['authorization']?.split(' ')[1];
    
//     if (!token) return res.sendStatus(403);

//     jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
//         if (err) return res.sendStatus(403);
        
//         try {
//             const user = await User.findById(decoded.id);
//             if (!user) return res.sendStatus(404);
//             res.json(user);
//         } catch (error) {
//             res.sendStatus(500);
//         }
//     });
// });


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        
        // If user does not exist
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        
        // If password does not match
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Optional: Generate a token (if you are using JWT for session management)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Use environment variable for secret

        // Return user ID and token (if applicable)
        res.status(200).json({
            message: 'Login successful',
            userId: user._id,
            token // Optional
        });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;