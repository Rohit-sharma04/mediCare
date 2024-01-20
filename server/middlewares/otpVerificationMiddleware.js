import userModel from "../models/userModels";

export const otpVerificationMiddleware = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user || !user.otpVerified) {
      // Redirect or send an error response if OTP is not verified
      return res.status(403).send({ success: false, message: 'OTP not verified' });
    }
    // If OTP is verified, proceed to the next middleware or route
    next();
  } catch (error) {
    res.status(500).send({ success: false, error, message: 'Error checking OTP verification status' });
  }
};

