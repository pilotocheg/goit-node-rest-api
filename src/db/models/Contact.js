import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import {
  emailValidationErrMessage,
  emailValidationPattern,
  phoneValidationErrMessage,
  phoneValidationPattern,
} from "../../constants/validation.js";

const Contact = sequelize.define("contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: [emailValidationPattern],
        msg: emailValidationErrMessage,
      },
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: [phoneValidationPattern],
        msg: phoneValidationErrMessage,
      },
    },
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

// uncomment to sync if the model above was updated
// Contact.sync({ alter: true });

export default Contact;
