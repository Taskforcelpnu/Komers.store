const express = require('express');
const app = express();
const PORT = 3000; // Порт, на якому буде працювати сервер

// Місце для підключення вашої бази даних або файлу з товарами(1)

// Обробка запиту для отримання товарів за категорією
app.get('/api/products/category', (req, res) => {
    const category = req.params.category; // Отримання категорії товарів з URL-параметра

    // Тут має бути логіка для отримання товарів з бази даних або файлу за вказаною категорією (2)
    // Наприклад, якщо ви маєте масив товарів, ви можете фільтрувати його за категорією

    // Приклад масиву товарів
    const products = [
        { name: 'Товар 1', category: 'Одяг', price: 100 },
        { name: 'Товар 2', category: 'Взуття', price: 200 },
        { name: 'Товар 3', category: 'Аксесуари', price: 300 },
        // Додайте інші товари сюди
    ];

    const filteredProducts = products.filter(product => product.category === category);

    // Повернення відфільтрованого списку товарів у форматі JSON
    res.json(filteredProducts);
});

// Статичне відображення статичних файлів, наприклад, HTML, CSS, JavaScript
app.use(express.static('public'));

// Запуск сервера на вказаному порті
app.listen(PORT, () => {
    console.log(`Сервер запущено на порті ${PORT}`);
});
