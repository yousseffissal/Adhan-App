const express = require('express');
const cors = require('cors');
const app = express();
const AdhanRoutes = require('./routes/adhan.route.js');

require('dotenv').config();

const PORT = process.env.PORT || 8090;
const FRONT_URL = process.env.FRONT_URL;

const corsOptions = {
    origin: FRONT_URL,
    optionsSuccessStatus: 200
};

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/AdhanTime', AdhanRoutes);

app.get('/', (req, res) => {
    res.status(200).send('Hello to the Express server!');
    console.log('Hello to the Express server!');
});



