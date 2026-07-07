import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const { name, currentPassword, newPassword } =
      req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    user.name = name || user.name;

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!isMatch) {
        return res.status(400).json({
          message: "Current password is incorrect.",
        });
      }

      user.password = await bcrypt.hash(
        newPassword,
        10
      );
    }

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};