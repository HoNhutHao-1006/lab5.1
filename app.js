const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const Supplier = require('./models/supplier');
const Product = require('./models/product');

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

app.get('/', async (req, res) => {
    const suppliers = await Supplier.find();
    const products = await Product.find();
    res.render('index', { title: 'Home Page', suppliers, products });
});

app.get('/suppliers', async (req, res) => {
    const suppliers = await Supplier.find();
    res.render('suppliers/index', { suppliers });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
