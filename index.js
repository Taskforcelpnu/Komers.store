const express = require('express')

const PORT = process.env.PORT || 3000

const app = express()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
app.get('/api', (req, res) => {
    res.json({
        message: "Hello from express.js"
    })
}) 