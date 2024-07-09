import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required!"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("Signup successful!");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "Credential is not valid!"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Credential is not valid!"));
    }
    // const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h"}

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // const { password: pass, ...rest } = validUser._doc;

    // this from video only destructure one field, password, instead of multiple fields.

    //     res
    //       .status(200)
    //       .cookie("access_token", token, {
    //         httpOnly: true,
    //       })
    //       .json(rest);
    //   } catch (error) {
    //     next(error);
    //   }
    // };

    if (validUser && validUser._doc) {
      // Destructure and exclude password and email from chatGPT
      const { password, email, ...rest } = validUser._doc;

      return res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true, // not accessible via client-side JavaScript
          // secure: true, // Ensures the cookie is sent over HTTPS only
        })
        .json(rest);
    } else {
      return next(errorHandler(500, "User data destructure is invalid."));
    }
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
