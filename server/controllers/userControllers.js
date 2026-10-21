const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createUser = async (req, res) => {
  try {
    const { name, email, gender, password } = req.body;

    // Server-side validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return res.status(400).json({ message: "Email is required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    if (!gender || typeof gender !== "string" || !gender.trim()) {
      return res.status(400).json({ message: "Gender is required" });
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check if account already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Securely hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name.trim(),
      email: normalizedEmail,
      gender: gender.trim(),
      password: hashedPassword,
      isSuperAdmin: false,
      status: "active",
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      data: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        gender: savedUser.gender,
        createdAt: savedUser.createdAt,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid user data provided" });
    }

    console.error("User registration error:", error.message);
    return res.status(500).json({
      message: "An error occurred during registration. Please try again later.",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Server-side validation
    if (!email || typeof email !== "string" || !email.trim() || !password || typeof password !== "string") {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user by normalized email
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      // Generic error message to prevent account enumeration
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if user is suspended
    if (user.status === "suspended") {
      return res.status(403).json({ message: "Your account has been suspended. Please contact platform administration." });
    }

    // Verify password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // Generic error message to prevent account enumeration
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not configured");
      return res.status(500).json({ message: "Server configuration error" });
    }

    // Sign JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, isSuperAdmin: Boolean(user.isSuperAdmin) },
      jwtSecret,
      { expiresIn: "7d" }
    );

    // Return safe user information without password or password hash
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        isSuperAdmin: Boolean(user.isSuperAdmin),
        status: user.status,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("User login error:", error.message);
    return res.status(500).json({
      message: "An error occurred during login. Please try again later.",
    });
  }
};

module.exports = { createUser, loginUser };
