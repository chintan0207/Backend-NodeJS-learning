const express = require('express')
const cors = require('cors')
require("./db/mongoose")

const app = express()
const port = 5000

app.listen(port, () => {
    console.log(`App listening on port number ${port}`)
})

app.use(express.json())
app.use(cors())

//all routes
app.use('/', require("./routes/auth"))
app.use('/api',require("./routes/routes"))
app.use('/api',require('./routes/formdata'))
app.use('/practice',require("./routes/learningRoutes"))
