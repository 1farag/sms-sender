import { sequelize } from "../config/db-config.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    hooks: {
        beforeSave:async (user) => {
            if (user.changed("password")) {
                const salt = bcrypt.genSaltSync(10, "a");
                user.password = bcrypt.hashSync(user.password, salt);
            }
        },
    },
}
);

User.prototype.toJSON = function () {
	const values = Object.assign({}, this.get());
	delete values.password;
	return values;
};

User.prototype.comparePasswords = async function (password) {
    return bcrypt.compareSync(password, this.password);
};

User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

export default User;