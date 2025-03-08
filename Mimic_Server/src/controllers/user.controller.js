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
  try {
    const { idToken } = req.body;
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, name, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, name, googleId });
    }

    const accessToken = generateAccessToken(user._id);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user, accessToken },
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
