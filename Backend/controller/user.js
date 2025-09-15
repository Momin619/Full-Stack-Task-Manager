import { User } from "../model/user.js";
export const postSignup = async (req, res, next) => {
  try {
    const { name, age, email, password } = req.body;
    const user = new User({
      name,
      age,
      email,
      password,
    });
    await user.save();
    return res.status(201).json({ message: "User Created Successfully !" });
  } catch (error) {
    console.log(error);
  }
};

export const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    console.log(user);
    const sessionData = {
      id: user._id,
      name: user.name,
      age: user.age,
      email: user.email,
    };

    req.session.user = sessionData;
    req.session.isLoggedIn = true;
    await req.session.save();
    return res
      .status(200)
      .json({ user: sessionData, isLoggedIn: req.session.isLoggedIn });
  } catch (error) {
    console.log(error);
  }
};

export const getSession = (req, res, next) => {
  if (req.session.user) {
    return res.json({ user: req.session.user, isLoggedIn: true });
  } else {
    return res.json({ user: null, isLoggedIn: false, redirectTo: "/signup" });
  }
};

export const postLogout = async (req, res, next) => {
  try {
    req.session.user = null;
    req.session.isLoggedIn = false;
    await req.session.save();
    return res.status(200).json({
      user: req.session.user,
      isLoggedIn: req.session.isLoggedIn,
      redirectTo: "/signup",
    });
  } catch (error) {
    console.log(error);
  }
};
