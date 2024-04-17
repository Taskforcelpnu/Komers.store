const express = require('express');
const http = require('http');

const app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
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
    console.log(`Сервер запущено на порту ${port}`);
});
