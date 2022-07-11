import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import userModel from "../models/user.js";

const loginUser = async (req, res, next) => {
    const {email, password, classId} = req.body;
    const foundUser = await userModel.findOne({ where: { email: email, classID: classId } });

    if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
        res.send({msg: "Hibás felhasználónév vagy jelszó!", type: "error"})
        return
    }
}

const registerUser = async (req, res, next) => {
    const {email, password, password2, lastname, firstname, birthDate, classId} = req.body;
    
    if (password !== password2) {
        res.send({msg: "A két jelszó nem egyezik!", type: "error"})
        return
    }

    const existEmail = await userModel.findOne({ where: { email: email } });

    if (existEmail) {
        res.send({msg: "Ezzel az e-mail címmel már regisztráltak!", type: "error"})
        return
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({ 
        email: email,
        password: hashedPassword,
        name: lastname + ' ' + firstname,
        birthDate: birthDate,
        classID: classId
    })
        .then(() => {
            res.send({msg: "Sikeres regisztráció! Mostmár bejelentkezhetsz.", type: "success"})
        })
}

export {loginUser, registerUser}