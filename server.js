const express = require('express');
const http = require('http');

const app = express();
app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
// Масив категорій (тимчасове рішення без бази даних)
let categories = [
    { id: 1, name: 'Одяг', description: 'Вміст категорії Одяг' },
    { id: 2, name: 'Взуття', description: 'Вміст категорії Взуття' },
    { id: 3, name: 'Аксесуари', description: 'Вміст категорії Аксесуари' }
];
// Масив продуктів (тимчасове рішення без бази даних)
let products = [];

let orders = [];
// Роут для отримання списку категорій
app.get('/categories', (req, res) => {
    res.json(categories);
});
app.post('/add-product', (req, res) => {
    const { name, categoryId } = req.body;
    const category = categories.find(cat => cat.id === parseInt(categoryId));
    if (!category) {
        return res.status(400).json({ message: 'Категорія не знайдена' });
    }
    const newProduct = { id: products.length + 1, name, categoryId };
    products.push(newProduct);
    res.status(201).json(newProduct); // Повертаємо статус 201 та створений продукт у відповіді
});
// Роут для створення нового продукту
app.get('/add-order', (req, res) => {
    const { fullName, phoneNumber, city, postNumber, cartItems } = req.body;
    if (!fullName || !phoneNumber || !city || !postNumber || !cartItems || !cartItems.length) {
        return res.status(400).json({ message: 'Неповний або некоректний запит' });
    }
    const newOrder = {
        id: orders.length + 1,
        fullName,
        phoneNumber,
        city,
        postNumber,
        cartItems,
        status: 'pending' // початковий статус - очікується обробка
    };
    orders.push(newOrder);
    res.status(201).json(newOrder); // Повертаємо статус 201 та створене замовлення у відповіді
});

const port = process.env.PORT || 1337;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Сервер запущено на порту ${port}`);
});