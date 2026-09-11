const User = require("../models/user.js")

const createUser = async (req, res) => {
    try {
        const { name, email, gender } = req.body
        const newUser = new User({
            name,
            email,
            gender
        })
        const savedUser = await newUser.save()
        res.status(201).json({
            message: "User created",
            data: savedUser
        })

    } catch (error) {
        res.status(500).json({
            message: "ERROR AT User creatION",
            error: error.message
        })
    }
}

module.exports = createUser 
