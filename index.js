require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const path = require('path')

const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
// Обработка ошибок, последний Middleware
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
app.get('/api', (req, res) => {
    res.json({
        message: "Hello from express.js"
    })
})

const start = async () => {
    let sequelize;
    sequelize.authenticate = async function () {

    };
    try {
        let sequelize;
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}