/* 
Middleware:
We want this middleware to authenticate requests to our server.
It will evaluate the session token sent from the client and verify that it is valid.
If the token is valid, it will allow the request to continue to the next function.
If the token is invalid, it will return a 401 status code and a message.

Tokens are being sent in the headers of the request.
Under the Authorization in the Headers
*/

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const validateSession = async (req, res, next) => {
  try {
    // ! 1. extract the token from the headers
    const token = req.headers.authorization;
    // console.log("token", token);
    // ! 2. verify and decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decodedToken", decodedToken);

    // !3 check the database to see if the user is active
    const user = await User.findById(decodedToken.id);

    if (!user) {
      throw new Error("user not found");
    }
    req.user = user;

    return next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = validateSession;
