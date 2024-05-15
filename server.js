const express = require('express');
const http = require('http');

const models = require('./db/models')
var sequelize = require('./db/db');

const app = express();
app.use(express.json());

// const start = async () => {
//
//     await sequelize.authenticate()
//     await sequelize.sync()
//
// }
// start ()


app.use((req, res, next) => {
    // ЩОБ HTML FILES БУЛИ ЗАПУЩЕНІ НА 63342 ЛОКАЛХОСТІ
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1337');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/order-list.html', function (req, res) {
    res.sendFile(__dirname + '/order-list.html');
});

//auth0
const { auth } = require('express-openid-connect');
const {json} = require("express");
const bodyParser = require("express");

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



let categories = [
    { id: 1, name: 'Одяг', description: 'Вміст категорії Одяг' },
    { id: 2, name: 'Взуття', description: 'Вміст категорії Взуття' },
    { id: 3, name: 'Аксесуари', description: 'Вміст категорії Аксесуари' }
];

let products = [];


app.get('/categories', (req, res) => {
    res.json(categories);
});

app.get('/add-product', (req, res) => {
    const { name, categoryId } = req.body;
    const category = categories.find(cat => cat.id === parseInt(categoryId));
    if (!category) {
        return res.status(400).json({ message: 'Категорія не знайдена' });
    }
    const newProduct = { id: products.length + 1, name, categoryId };
    products.push(newProduct);
    res.status(201).json(newProduct);
});




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Змінна для збереження замовлень (тимчасово у пам'яті сервера)
let orders = [] // important

// Запуск сервера

const port = process.env.PORT || 1337;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Сервер запущено на порту ${port}`);
});
// Роут для створення нового замовлення
app.post('/add-order', (req, res) => {
    const { fullName, phoneNumber, city, postNumber,productsInBucket } = req.body;
    console.log("test")
    // Перевірка на обов'язкові поля
    if (!fullName || !phoneNumber || !city || !postNumber) {
        return res.status(400).json({message: 'Неповний або некоректний запит'});
    }

    // Створення нового замовлення
    const newOrder = {
        id: orders.length + 1,
        fullName,
        phoneNumber,
        city,
        postNumber,
        productsInBucket,
        status: 'pending' // Початковий статус - очікується обробка
    };
    orders.push(newOrder);
    console.log(orders)
    // Повернення статусу 201 та створеного замовлення у відповіді
    res.status(201).json(newOrder);
});

// Роут для отримання списку замовлень
app.get('/get-order', (req, res) => {
    // Повертаємо список замовлень у відповідь
    res.json(orders);
});



