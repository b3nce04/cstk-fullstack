import express from 'express';

import {getSetting} from '../../controllers/setting.js'

const router = express.Router();

router.get("/:key", getSetting);

export default router;