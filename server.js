const express = require('express');
const http = require('http');

const models = require('./db/models')
//database
var sequelize = require('./db/db');


const app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

//auth0
const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:1337',
    clientID: '1LwuGmAKqH4Zzrwl8A3CqGnyAShFc1QO',
    issuerBaseURL: 'https://dev-6nm2ori0utnhce7b.eu.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Змінні для зберігання списків категорій і товарів (тимчасове рішення без бази даних)
let categories = [
    { id: 1, name: 'одяг' },
    { id: 2, name: 'взуття' },
    { id: 3, name: 'аксесуари' }
];

let products = [];

// Додавання продукту до масиву products
products.push({
    id: 1,
    name: 'Сукня',
    price: 100,
    category: { id: 1, name: 'одяг' }
});


products.push({
    id: 2,
    name: 'Мокасіни',
    price: 100,
    category: { id: 2, name: 'взуття' }
})

app.use(express.json());

// Роут для отримання списку категорій
app.get('/categories', (req, res) => {
    res.json(categories);
});

// Роут для отримання списку товарів
app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/add-product', (req, res) => {
    const { name, categoryId } = req.query;
    const category = categories.find(cat => cat.id === parseInt(categoryId));
    if (!category) {
        return res.status(400).json({ message: 'Категорія не знайдена'});
    }
    const newProduct = { id: products.length + 1, name, categoryId };
    products.push(newProduct);
    res.status(201).json(newProduct); // Повертаємо статус 201 та створений продукт у відповіді
});

const port = process.env.PORT || 1337;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`The server is started on the port ${port}`);
});
