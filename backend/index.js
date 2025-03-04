const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const userRouter = require('./ROUTES/userRoutes')
const taskRouter = require('./ROUTES/taskRoutes')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(bodyParser.json())
require('dotenv').config();
const port = process.env.PORT

app.use('/users', userRouter)
app.use('/tasks', taskRouter)

app.get('/', (req, res) => {
    res.send('api working')
})

app.listen(port, () => {
    console.log("api is listning on",port)
});