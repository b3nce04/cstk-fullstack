import express from 'express';

import userRoutes from './api/user.js'
import classRoutes from './api/class.js'
import settingRoutes from './api/setting.js'

const router = express.Router();

router.use((req, res, next) => {
    if (!req.get('api-key') || req.get('api-key') !== process.env.API_KEY) {
        res.status(403).json({msg: "Nincs vagy hibás API kulcs. Hozzáférés megtagadva!"})
        return
    }
    next();
})

router.use("/user", userRoutes);
router.use("/class", classRoutes);
router.use("/setting", settingRoutes);

export default router;