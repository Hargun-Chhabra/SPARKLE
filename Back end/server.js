require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to the database'))

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use('/public',express.static('public'));  
app.use(cors());

const refundRouter  = require('./api/routes/refund')
app.use('/refund', refundRouter)

const salesRouter  = require('./api/routes/salesReport')
app.use('/sales', salesRouter)

const inventoryRouter = require('./api/routes/inventory')
app.use('/inventory', inventoryRouter)

app.use("/order",require("./api/routes/orderDetails"))

const repairRouter = require('./api/routes/repairs')
app.use('/repair', repairRouter)


app.use("/user",require("./api/routes/usercrud"))

const specialRouter = require('./api/routes/sorder')
app.use('/sorder', specialRouter)

app.listen(3000, () => console.log('Server Started'))
