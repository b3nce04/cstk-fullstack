import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user.js";
import codeModel from "../models/code.js";

const loginUser = async (req, res, next) => {
	const { email, password, classId } = req.body;
	
	const foundUser = await userModel.findOne({
		where: { email: email, classID: classId },
	});

	if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
		res.json({ msg: "Hibás felhasználónév vagy jelszó!", type: "error" });
		return;
	}

	const token = jwt.sign(
		{ id: foundUser.id, email: foundUser.email },
		process.env.JWT_PRIVATE_KEY,
		{expiresIn: "30m"}
	);

	res.status(201).cookie("user_token", token, 
	{
		httpOnly: true,
		secure: process.env.NODE_ENV == 'production'
	}).json({
		msg: "Sikeresen bejelentkeztél!",
		type: "success",
	});
};

const registerUser = async (req, res, next) => {
	const {
		email,
		password,
		password2,
		code,
		lastname,
		firstname,
		birthDate,
		classId,
	} = req.body;

	if (password !== password2) {
		res.json({ msg: "A két jelszó nem egyezik!", type: "error" });
		return;
	}

	const existEmail = await userModel.findOne({ where: { email: email } });

	if (existEmail) {
		res.json({
			msg: "Ezzel az e-mail címmel már regisztráltak!",
			type: "error",
		});
		return;
	}

	const checkCode = await codeModel.findOne({ where: { code: code } });

	if (!checkCode) {
		res.json({
			msg: "A regisztrációs kód hibás!",
			type: "error",
		});
		return;
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = await userModel
		.create({
			email: email,
			password: hashedPassword,
			name: lastname + " " + firstname,
			birthDate: birthDate,
			classID: classId,
		})
		.then(() => {
			checkCode.destroy()
			res.json({
				msg: "Sikeres regisztráció! Mostmár bejelentkezhetsz.",
				type: "success",
			});
		});
};

const authUser = (req, res, next) => {
	const token = req.cookies.user_token;

	if (!token) {
		res.status(401).json({
			msg: "Nincs bearer token. Hozzáférés megtagadva!",
		});
		return;
	}

	jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, user) => {
		if (err) {
			res.status(403).json({
				msg: "Hibás bearer token. Hozzáférés megtagadva!",
			});
			return;
		}
		req.user = user;
		next();
	});
};

const logoutUser = (req, res, next) => {
	res.clearCookie('user_token').status(200).json({
		msg: "Sikeresen kijelentkeztél!",
		type: "success"
	});
};

const checkUserAuthenticated = (req, res, next) => {
	const token = req.cookies.user_token;

	if (!token) {
		res.json({authenticated: false});
		return;
	}

	jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, user) => {
		if (err) {
			res.json({authenticated: false});
			return;
		}
		res.json({authenticated: true});
	});
};

export { loginUser, registerUser, logoutUser, authUser, checkUserAuthenticated };