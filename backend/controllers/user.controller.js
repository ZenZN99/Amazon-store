import bcrypt from "bcryptjs";
import validator from "validator";
import User from "../models/user.model.js"; 
import { uploadToCloudinary } from "../libs/cloudinary.js"; 
import cloudinary from "../libs/cloudinary.js"; 
import { generateToken } from "../libs/token.js"; 

export async function signup(req, res) {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password)
      return res.status(400).json({ error: "All fields are required" });
    if (!validator.isEmail(email))
      return res.status(400).json({ error: "Invalid Email address" });
    if (password.length < 8)
      return res
        .status(400)
        .json({ error: "Password too short (min 8 chars)" });
    if (password.length > 40)
      return res
        .status(400)
        .json({ error: "Password too long (max 40 chars)" });

    const existEmail = await User.findOne({ email });
    if (existEmail)
      return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 12);

    const isAdmin =
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD;

    const newUser = await User.create({
      fullname,
      email,
      password: hashed,
      avatar: "https://res.cloudinary.com/dgagbheuj/image/upload/v1763194734/avatar-default-image_yc4xy4.jpg",
      role: isAdmin ? "Admin" : "User",
    });

    const token = generateToken({ _id: newUser._id.toString(), role: newUser.role });

    res.status(201).json({
      success: "Account created successfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Email not registered" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ error: "Wrong password" });

    const token = generateToken({ _id: user._id.toString(), role: user.role });

    res.json({
      success: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function me(req, res) {
  try {
    const userId = req.user._id; 
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateProfile(req, res) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (req.file) {
      if (user.avatar?.includes("res.cloudinary.com")) {
        const publicId = user.avatar.split("/").pop().split(".")[0];
        await cloudinary.v2.uploader.destroy(`users/avatars/${publicId}`);
      }

      const upload = await uploadToCloudinary(req.file, "users/avatars");
      user.avatar = upload.secure_url;
    }

    await user.save();

    res.json({ success: "Profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteUser(req, res) {
  try {
    const adminUser = await User.findById(req.user._id);
    if (!adminUser) return res.status(404).json({ error: "User not found" });
    if (adminUser.role !== "Admin")
      return res.status(403).json({ error: "Only admin can delete users" });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User to delete not found" });

    await User.findByIdAndDelete(req.params.id);
    res.json({ success: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
