/* 
localhost:4000/user

*/

const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* 
Endpoint: "localhost:4000/user/register"
Request Type: POST
- Create a variable to store the data coming from the req.body
- Create a variable to store the new user in a User Model Object (Make sure we import the UserSchema from the model)
- Encrypt the password (Use bcrypt)
- Save the data to the database
- Create and issue a JWT (jsonwebtoken)
- Send a response to the client with a message that the user has been created
*/
router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const user = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: bcrypt.hashSync(password, 10),
    });

    const newUser = await user.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: 7 * 24 * 60 * 60,
    });
    // expiresIn: 7 days * 24 hours * 60 minutes * 60 seconds

    res.json({
      message: "register endpoint",
      user: newUser,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* 
Endpoint: "localhost:4000/user/signin"
Request Type: POST
- Create a variable to store the data coming from the req.body
- Create a new User Model Object.
- see if the user exists in the database
    - if the user exists then send a response to the client with a message that the user has been logged in
    - if the user does not exist then send a response to the client with a message that the user does not exist (Throw Error)
- Check to see if the passwords are are a match using bcrypt to compare the passwords
- Generate a token based on the user that is signing in
*/

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    //  If the user doesn't exist then throw an error and exit the function
    if (!user) {
      throw new Error("User does not exist");
    }

    // const isPasswordAMatch = user.password === password;
    // ! Order matters when comparing passwords
    // ! 1st: password from req.body 2nd: password from the database
    const isPasswordAMatch = await bcrypt.compare(password, user.password);
    if (isPasswordAMatch === false) {
      throw new Error("Passwords do not match");
    }

    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 7 * 24 * 60 * 60,
    });

    res.json({
      message: "signin endpoint",
      user: user,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
