const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_STR, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.use('/suppliers', require('./routes/supplierRoutes'));
app.use('/products', require('./routes/productRoutes'));

app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
