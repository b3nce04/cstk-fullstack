import classModel from "../models/class.js";

const getClasses = async (req, res, next) => {
    const classes = await classModel.findAll();
    res.send(JSON.stringify(classes))
}

export {getClasses}