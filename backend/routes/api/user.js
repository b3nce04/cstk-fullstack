import express from 'express';

import {loginUser, registerUser, checkUserAuthenticated, logoutUser} from '../../controllers/user.js'

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/is-authenticated", checkUserAuthenticated);
router.get("/logout", logoutUser);

export default router;