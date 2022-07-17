import 'dotenv/config'
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'

import apiRoutes from './routes/api.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'api-key'],
    credentials: true
}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Rest API elindítva itt: http://localhost:${PORT}/`);
})

app.use((req, res, next) => {
    res.set({'Content-Type': 'application/json'})
    if (process.env.NODE_ENV === 'development') {
        const time = new Date(Date.now())
        var hours = time.getHours();
        hours < 10 ? hours = '0' + hours : hours
        var minutes = time.getMinutes();
        minutes < 10 ? minutes = '0' + minutes : minutes
        console.log(`Kérés érkezett: ${hours}:${minutes}, ${req.originalUrl} - ${req.method}`)
    }
    next()
})

app.use('/api/v1', apiRoutes)