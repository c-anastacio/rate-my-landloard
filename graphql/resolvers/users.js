const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { validateRegisterUser } = require("../../util/validators");
const { validateUserLogin } = require("../../util/validators");
const User = require("../../models/User");
const { SECRET_KEY } = require("../../config");
const resolvers = require(".");

function createUserToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateUserLogin(username, password);

      if (!valid) {
        throw new UserInputError("Failed", { errors });
      }

      const userLogin = await User.findOne({ username });
      if (!userLogin) {
        errors.general = "User not found";
        throw new UserInputError("Failed", { errors });
      } else {
        const correctPass = await bcrypt.compare(password, userLogin.password);
        if (!correctPass) {
          errors.general = "Wrong password";
          throw new UserInputError("Failed", { errors });
        }
      }
      const token = createUserToken(userLogin);
      return {
        ...userLogin._doc,
        id: userLogin._id,
        token,
      };
    }, //Login End

    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      //TODO
      const { valid, errors } = validateRegisterUser(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Failed", { errors });
      }

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is not available", {
          errors: {
            username: "This username is not available",
          },
        });
      }

      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      const token = createUserToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    }, //Register End
  },
};
