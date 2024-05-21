 
import APIService from './ApiService.js';

var productsInBucket = [];


const apiService = new APIService();


document.querySelectorAll('.page-link').forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const buttons = document.querySelector(".buttons-holder")
        const sidebar = document.querySelector(".sidebar")
        var targetId = this.getAttribute('href').substr(1);
        document.querySelectorAll('.content').forEach(function (content) {
            buttons.style.display = "none"
            sidebar.style.width = "100vw"
            if (targetId ==="home") {
                buttons.style.display = "block"
                sidebar.style.width = "200px"
            }
            if (content.id === targetId) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
document.addEventListener('DOMContentLoaded', async function () {
  
    await apiService.displayProducts();

    document.querySelectorAll('.add-to-cart-btn').forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            var productInfo = this.closest('.product-info');
            var productName = productInfo.querySelector("h2").textContent;
            var productPrice = productInfo.querySelector('p').textContent;
            var productImageSrc = productInfo.querySelector('img').src;
            var cartItem = document.createElement('div');
            var productImage = document.createElement('img');
            productImage.src = productImageSrc;
            productImage.classList.add('cart-item-image');
            cartItem.appendChild(productImage);
            cartItem.innerHTML += productName + ' - ' + productPrice;
            document.getElementById('cart-items').appendChild(cartItem);
            console.log(productImageSrc)
            productsInBucket.push({
                productName,
                productPrice,
                productImageSrc
            })
        });
    });

    const createProductForm = document.getElementById('createProductForm');
    createProductForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const category = document.getElementById('categoryDropdown').value; // Отримуємо значення категорії з дропдауну
        const productName = document.getElementById('productName').value;
        const productImageSrc = document.getElementById('productImageSrc').value;
        const productPrice = document.getElementById('productPrice').value;

        // Відправка POST-запиту на сервер для створення товару
        await apiService.createProduct({
                name: productName,
                imageSrc: productImageSrc,
                price: productPrice,
                category,
                id: Date.now().toString() + Math.floor(Math.random() * 1000)
        });
    });
});
// Функція для отримання тексту з першого доступного елемента вказаних типів
function getProductText(parentElement, ...headerTags) {
    for (const tag of headerTags) {
        const element = parentElement.querySelector(tag);
        if (element) {
            return element.textContent;
        }
    }
    return '';
}

function openModal() {
    // Створення модального вікна
    var modal = document.createElement('div');
    modal.classList.add('modal');
    modal.style.width = '800px';
    modal.style.height = '400px';
    // Додавання контенту в модальне вікно (наприклад, текст або інші елементи)
    modal.innerHTML = `
<div class="modal-content">
    <span class="close" onclick="closeModal()">&times;</span>
    <p></p>
    <input type="text" class="input-field" id="fullName" placeholder="Введіть Прізвище, Ім'я "><br>
    <input type="text" class="input-field" id="phoneNumber" placeholder="Номер телефону"><br>
    <input type="text" class="input-field" id="city" placeholder="Населений пункт"><br>
    <input type="text" class="input-field" id="postNumber" placeholder="Номер відділення пошти або поштомату"><br>
    <button onclick="window.submitOrder()">Відправити</button>
</div>`;
    // Додавання модального вікна до body
    document.body.appendChild(modal);
    var fullNameInput = document.getElementById('fullName');
    var phoneNumberInput = document.getElementById('phoneNumber');
    var cityInput = document.getElementById('city');
    var postNumberInput = document.getElementById('postNumber');
    fullNameInput.addEventListener('input', function (event) {
        var value = event.target.value;
        if (!/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s]*$/.test(value)) {
            event.target.value = value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐ\s]/g, '');
        }
    });
    phoneNumberInput.addEventListener('input', function (event) {
        var value = event.target.value;
        if (!/^\d*$/.test(value)) {
            event.target.value = value.replace(/\D/g, '');
        }
    });
    cityInput.addEventListener('input', function (event) {
        var value = event.target.value;
        if (!/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s]*$/.test(value)) {
            event.target.value = value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐ\s]/g, '');
        }
    });
    postNumberInput.addEventListener('input', function (event) {
        var value = event.target.value;
        if (!/^\d*$/.test(value)) {
            event.target.value = value.replace(/\D/g, '');
        }
    });
}
function closeModal() {
    var modal = document.querySelector('.modal');
    modal.parentNode.removeChild(modal);
}

async function submitOrder() {
        const fullName = document.getElementById('fullName').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const city = document.getElementById('city').value;
        const postNumber = document.getElementById('postNumber').value;
        // const cartItems = []; // Тут ваша логіка для отримання даних з корзини
        if (productsInBucket.length < 0) {
            return alert("Bucket is empty")
        }
        // Відправка POST-запиту на сервер
       await apiService.orderProducts({
                fullName,
                phoneNumber,
                city,
                postNumber,
                productsInBucket
                // cartItems
            });
    }



document.querySelectorAll('.category-btn').forEach(function (btn) {
    btn.addEventListener('click', function (event) {
        event.preventDefault();
        var category = this.getAttribute('id');
        var products = document.querySelectorAll('.product');

        products.forEach(function (product) {
            var productCategory = product.querySelector('.product-info').getAttribute('data-product');

            if (category === 'all' || productCategory === category) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
        document.querySelectorAll('.category-btn').forEach(function (btn) {
            btn.classList.remove('category-btn-active');
        });
        this.classList.add('category-btn-active');
    });
});


window.openModal = openModal;
window.closeModal = closeModal;
window.submitOrder = submitOrder;