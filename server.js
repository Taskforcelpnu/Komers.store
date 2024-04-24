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
// Роут для отримання списку категорій
app.get('/categories', (req, res) => {
    res.json(categories);
});

// Роут для створення нового продукту
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

const port = process.env.PORT || 1337;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Сервер запущено на порту ${port}`);
});