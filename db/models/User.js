import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import {
  emailValidationErrMessage,
  emailValidationPattern,
} from "../../constants/validation.js";

const User = sequelize.define("user", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Email in use",
    },
    validate: {
      is: {
        args: [emailValidationPattern],
        msg: emailValidationErrMessage,
      },
    },
  },
  subscription: {
    type: DataTypes.ENUM,
    values: ["starter", "pro", "business"],
    defaultValue: "starter",
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

// uncomment to sync if the model above was updated
// User.sync({ force: true });

export default User;
