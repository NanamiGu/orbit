const User = require("../models/user.js")

const createUser = async (req, res) => {
    try {
        const { name, email, gender, password } = req.body
        const newUser = new User({
            name,
            email,
            gender,
            password,
        })
        const savedUser = await newUser.save()
        res.status(201).json({
            message: "User created",
            data: savedUser
        })

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Email already exists",
                error: error.message
            })
        }
        res.status(500).json({
            message: "ERROR AT User creatION",
            error: error.message
        })
    }
}

module.exports = createUser 
