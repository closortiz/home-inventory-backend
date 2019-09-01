const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
})

const productRouter = require('./routes/product');
const unitRouter = require('./routes/unit');
const roomRouter = require('./routes/room');

app.use('/products',productRouter);
app.use('/unit',unitRouter);
app.use('/room',roomRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});