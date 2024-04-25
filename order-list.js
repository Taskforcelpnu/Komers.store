document.addEventListener('DOMContentLoaded', function () {
    // Отримати елементи сторінки
    const orderButton = document.querySelector('.order');
    const myOrderItemsContainer = document.getElementById('my-order-items');

    // Список замовлень
    const ordersList = [];

    // Обробник події для кнопки "Оформити замовлення"
    orderButton.addEventListener('click', function () {
        // Отримуємо дані про товар з першого блоку товару
        const productName = document.querySelector('.product-info h1').textContent;
        const productPrice = document.querySelector('.product-info p').textContent;

        // Додаємо дані про товар у список замовлень
        ordersList.push({ name: productName, price: productPrice });

        // Оновлюємо список замовлень на сторінці
        updateOrderList();
    });

    // Функція для оновлення списку замовлень на сторінці
    function updateOrderList() {
        // Очищаємо контейнер замовлень
        myOrderItemsContainer.innerHTML = '';

        // Додаємо кожен товар зі списку замовлень до сторінки
        ordersList.forEach(function (order) {
            const newItem = document.createElement('div');
            newItem.textContent = `${order.name} - ${order.price}`;
            myOrderItemsContainer.appendChild(newItem);
        });
    }
});
