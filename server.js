const express = require('express');
const http = require('http');

const app = express();
app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/order-list.html');
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

app.post('/add-product', (req, res) => {
    const { name, categoryId } = req.body;
    const category = categories.find(cat => cat.id === parseInt(categoryId));
    if (!category) {
        return res.status(400).json({ message: 'Категорія не знайдена' });
    }
    const newProduct = { id: products.length + 1, name, categoryId };
    products.push(newProduct);
    res.status(201).json(newProduct);
});
let orders = [];

// Роут для створення нового замовлення
app.post('/add-order', (req, res) => {
    const { fullName, phoneNumber, city, postNumber, cartItems } = req.body;

    // Перевірка на обов'язкові поля
    if (!fullName || !phoneNumber || !city || !postNumber || !cartItems || !cartItems.length) {
        return res.status(400).json({ message: 'Неповний або некоректний запит' });
    }

    // Створення нового замовлення
    const newOrder = {
        id: orders.length + 1,
        fullName,
        phoneNumber,
        city,
        postNumber,
        cartItems,
        status: 'pending' // Початковий статус - очікується обробка
    };
    orders.push(newOrder);

    // Повернення статусу 201 та створеного замовлення у відповіді
    res.status(201).json(newOrder);
});

// Роут для отримання списку своїх замовлень
app.get('/my-orders', (req, res) => {
    const { userId } = req.query;

    // Фільтрація замовлень за ідентифікатором користувача
    const userOrders = orders.filter(order => order.userId === userId);
    res.json(userOrders);
});

// Роут для отримання списку всіх замовлень (для адміна)
app.get('/all-orders', (req, res) => {
    res.json(orders);
});

const port = process.env.PORT || 1337;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Сервер запущено на порту ${port}`);
});