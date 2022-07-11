import database from "../controllers/database.js";
import {DataTypes} from "sequelize";

const Setting = database.define('Setting', {
    key: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    value: {
        type: DataTypes.STRING
    },
})

Setting.sync()

export default Setting;