const express = require('express');
const http = require('http');

const app = express();
app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
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

// Додавання замовлення
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

// Отримання списку всіх замовлень
app.get('/orders', (req, res) => {
    res.json(orders);
});

// Оновлення статусу замовлення за його ідентифікатором
app.get('/update-order/:orderId', (req, res) => {
    const orderId = parseInt(req.params.orderId);
    const { status } = req.body;

    // Знаходимо замовлення за його ідентифікатором
    const orderToUpdate = orders.find(order => order.id === orderId);
    if (!orderToUpdate) {
        return res.status(404).json({ message: 'Замовлення не знайдено' });
    }

    // Оновлюємо статус замовлення
    orderToUpdate.status = status;

    // Повернення оновленого замовлення у відповіді
    res.json(orderToUpdate);
});

// Видалення замовлення за його ідентифікатором

app.get('/delete-order/:orderId', (req, res) => {
    const orderId = parseInt(req.params.orderId);

    // Знаходимо індекс замовлення за його ідентифікатором
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) {
        return res.status(404).json({ message: 'Замовлення не знайдено' });
    }

    // Видаляємо замовлення з масиву за його індексом
    orders.splice(orderIndex, 1);

    // Повернення повідомлення про успішне видалення замовлення
    res.json({ message: 'Замовлення успішно видалено' });
});

const port = process.env.PORT || 1337;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Сервер запущено на порту ${port}`);
});