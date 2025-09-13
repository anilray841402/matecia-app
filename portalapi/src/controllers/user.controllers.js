import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required here",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not registered",
      });
    }
    const setone = "abcdef"
    const setTwo = "ABCD"
    const setThree = "0123456"
    const token = crypto.randomBytes(32).toString("hex");
    // console.log(token);
    user.verificationToken = token;

    //send email
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOption = {
      from: process.env.MAILTRAP_SENDEREMAIL,
      to: user.email,
      subject: "Verify your email", // Subject line
      text: `Please click on the following link:
      ${process.env.BASE_URL}/api/v1/users/verify/${token}
      `,
    };

    await transporter.sendMail(mailOption);


    await user.save();

    res.status(201).json({
      message: "Successfully Registered",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "User not registered ",
      error: error,
      success: false,
    });
  }
};

const verifyUser = async (req, res) => {

  const { token } = req.params;
  // console.log(token);
  if (!token) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }
  try {
    // console.log("verification started");

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({
      message: "Successfully Verified",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "User not verified",
      error,
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All Fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        Message: "Envalid Email here",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        Message: "Envalid Email or Password",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    const cookieOptions = {
      httpOnly: false,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    }
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      Message: "LogedIn Successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message, 
    });
  }
}

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Authenticated successfully",
      user,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Authenticated Fail",
      error: error,
    });
  };
}

const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {});
    res.status(200).json({
      success: true,
      message: "Loged Out Successfully",
    });
  } catch (error) {
    res.json.status(400).json({
      success: false,
      message: "error",
      error,
    });
  }
}

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 60 * 100;
    await user.save();

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false, 
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOption = {
      from: process.env.MAILTRAP_SENDEREMAIL,
      to: user.email,
      subject: "Verify your email", // Subject line
      text: `Please click on the following link:
      ${process.env.BASE_URL}/api/v1/users/reset-password/${token}
      `,
    };

    await transporter.sendMail(mailOption);

    res.status(200).json({
      message: "Verification Code sent successfully",
      success: true,
    });

  } catch (error) {
    // console.log(error);
    res.status(400).json({
      message: "Verification Code error",
      success: false,
      error: error,
    });
  }
}

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Invalid token"
      });
    }
    const { password, confPassword } = req.body;

    if (password !== confPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and cnf password does not match"
      });
    }

    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
      if (!user) {
        return res.status(400).json({
          message: "Invalid token here",
          success: false,
        });
      }
      user.password = password;
      user.resetPasswordToken = "";
      user.resetPasswordExpires = Date.now();
      await user.save();

      res.status(200).json({
        message: "Password Reset Succesfully",
        success: true,

      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Password Does not reset",
        error: error,
      })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Password Does not reset succesfully",
      error: error,
    })
  }
};

const checkLogin = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authenticated Successfully",
  });
};

const verifyToken = async (req, res) => {
  let token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Token missing" });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET); // verify & decode
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Token is valid",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}

export {
  registerUser, verifyUser, loginUser, getMe, logoutUser, forgotPassword,
  resetPassword, checkLogin, verifyToken
};