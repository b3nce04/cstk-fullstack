import express from 'express';

import userRoutes from './api/user.js'
import classRoutes from './api/class.js'
import settingRoutes from './api/setting.js'

const router = express.Router();

router.use((req, res, next) => {
    if (process.env.API_KEY && req.get('api-key') === process.env.API_KEY) {
        next();
    } else {
        res.status(401).send({msg: "Hibás API kulcs. Hozzáférés megtagadva!"})
    }
})

router.use("/user", userRoutes);
router.use("/class", classRoutes);
router.use("/setting", settingRoutes);

export default router;