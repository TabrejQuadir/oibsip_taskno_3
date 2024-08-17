require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/authRoutes');
const baseRoutes = require('./routes/baseRoutes');
const sauceRoutes = require('./routes/sauceRoutes');
const cheeseRoutes = require('./routes/cheeseRoutes');
const veggiesRoutes = require('./routes/veggiesRoutes');
const meatRoutes = require('./routes/meatRoutes');
const pizzaRoutes = require('./routes/pizzaRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/bases', baseRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/api/cheeses', cheeseRoutes);
app.use('/api/veggies', veggiesRoutes);
app.use('/api/meats', meatRoutes);
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
