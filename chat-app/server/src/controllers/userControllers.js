const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  console.log(
    req.body,
    "naodasjdiojasoidjasiodjasiojdoaisjdioasjdioasjdioasjiojasoidjasoidjaiosdjioasdjiaosdjioasjdi"
  );
  const { displayName, email, uid, photoURL, firstName, surName } = req.body;
  console.log(displayName);
  console.log(email);
  console.log(uid);
  console.log(photoURL);
  if (!displayName || !email) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(200);
    return;
  }
  if (firstName !== null) {
    const user = await User.create({
      _id: uid,
      displayName: displayName ? displayName : firstName + " " + surName,
      email: email,
      photoURL: photoURL,
      uid,
    });

    if (user) {
      console.log(user, "user");
      res.status(201).json({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    }
  } else {
    res.status(200);
    // throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { allUsers, registerUser, authUser };
