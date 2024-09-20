const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

// Function to generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30m" });
};

// Register new user
exports.registerUser = async (req, res) => {
  // Validate request body
  await body("email").isEmail().withMessage("Invalid email format").run(req);
  await body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .run(req);
  await body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .run(req);
  await body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, password, firstName, lastName } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Create and save the new user
    const newUser = new User({ email, password, firstName, lastName });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully, please log in.",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      details: error.message,
    });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  // Validate request body
  await body("email").isEmail().withMessage("Invalid email format").run(req);
  await body("password")
    .notEmpty()
    .withMessage("Password is required")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Check if the password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate a token and send it back
    const token = generateToken(user._id);
    res.status(200).json({
      success: true,
      token,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
