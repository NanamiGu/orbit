const User = require("../models/user.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const createUser = async (req, res) => {
    try {
        const { name, email, gender, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        

        const newUser = new User({
            name,
            email,
            gender,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            message: "User created",
            data: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                gender: savedUser.gender,
            },
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }

        res.status(500).json({
            message: "ERROR AT User creation",
            error: error.message,
        });
    }
};
// server/controllers/userControllers.js
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Return user data without password
        const { password: _, ...userData } = user.toObject();
          const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
);

       res.status(200).json({
    message: "Login successful",
    token,
    user: userData
});
    } catch (error) {
        res.status(500).json({ message: "Error during login", error: error.message });
    }
};

module.exports = { createUser, loginUser } 
