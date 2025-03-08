import { ApiError } from "../utils/ApiError.js";
import { OAuth2Client } from "google-auth-library";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(new ApiError(404, "User does not exist"));
    }

    const accessToken = user.generateAccessToken();

    return { accessToken };
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "Something went wrong while generating refresh and access token"
        )
      );
  }
};

const googleAuth = async (req, res) => {
  console.log("Google Auth Request:", req.body);
  try {
    const { user } = req.body;

    if (!user || !user.email) {
      return res.status(400).json(new ApiError(400, "Invalid user data"));
    }

    let existingUser = await User.findOne({ email: user.email });

    if (!existingUser) {
      existingUser = await User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
      });
    } else {
      // Optional: Update user info if they already exist
      existingUser.firstName = user.firstName;
      existingUser.lastName = user.lastName;
      existingUser.image = user.image;
      await existingUser.save();
    }

    const { accessToken } = await generateAccessToken(existingUser._id);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: existingUser, accessToken },
          "User authenticated successfully"
        )
      );
  } catch (error) {
    console.error("Google Auth Error:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Google authentication failed"));
  }
};

export { googleAuth };
