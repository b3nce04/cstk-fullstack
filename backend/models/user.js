import database from "../controllers/database.js";
import {DataTypes} from "sequelize";

import Class from './class.js'

const User = database.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    birthDate: {
        type: DataTypes.DATEONLY
    },
    registrationDate: {
        type: DataTypes.DATE,
        defaultValue: database.fn('NOW')
    },
    points: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    suspended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
})

User.belongsTo(Class, {
    foreignKey: 'classID'
})

User.sync()

export default User;