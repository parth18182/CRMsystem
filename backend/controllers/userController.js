import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(301).json({
        message: "all fields are must required",
      });
    }

    const existingUser = await userModel.findOne({email,});

    if (existingUser) {
      return res.status(401).json({
        message: "user already exist",

        success: false,
      });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashPass,
    });
    await user.save();
    return res.status(200).json({
      message: "signup success",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",

      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(300).json({
        message: "all fields are required",
      });
    }
    const user = await userModel.findOne({
      email,
    });
    if (!user) {
      return res.status(301).json({
        message: "user not found",
      });
    }
    const passcheck = await bcrypt.compare(password, user.password);
    if (!passcheck) {
      return res.status(301).json({
        message: "Invalid password",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        role: user.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );
    return res.status(200).json({
      success: true,
      message: `welcome ${user.name}`,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",

      error,
    });
  }
};
