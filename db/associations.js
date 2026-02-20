import User from "./models/User.js";
import Contact from "./models/Contact.js";

User.hasMany(Contact, { foreignKey: "id" });
Contact.belongsTo(User, { foreignKey: "owner" });
