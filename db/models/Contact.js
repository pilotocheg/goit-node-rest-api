import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import {
  phoneValidationErrMessage,
  phoneValidationPattern,
} from "../../constants/contacts.js";

const Contact = sequelize.define("contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
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
});

// uncomment to sync if the model above was updated
// Contact.sync({ alter: true });

export default Contact;
