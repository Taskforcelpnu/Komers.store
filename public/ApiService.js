export default class APIService {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
        this.orderUrl = 'http://localhost:1337';
    }

    async getProducts() {
        const response = await fetch(`${this.baseUrl}/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        return response.json();
    }

    async createProduct(productData) {
        const response = await fetch(`${this.baseUrl}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });

        if (response.ok) {
            alert('Товар успішно створено');
            location.reload();
        } else {
            alert('Помилка при створенні товару');
        }
    }

    async orderProducts(productsInBucket) {
        const response = await fetch(`${this.orderUrl}/add-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productsInBucket)
        });

        if (response.ok) {
            const order = await response.json();
            console.log('Замовлення успішно відправлено:', order);
            window.closeModal()
            window.open('/order-list.html',"_self");
        } else {
            alert('Помилка при створенні замовлення');
        }
    }

    async displayProducts() {
        const products = await this.getProducts();

        const productsContainer = document.querySelector('.products');

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            const productInfoDiv = document.createElement('div');
            productInfoDiv.classList.add('product-info');
            productInfoDiv.setAttribute('data-product', product.category);

            const productImage = document.createElement('img');
            productImage.src = product.imageSrc;
            productImage.alt = product.name;

            const productName = document.createElement('h2');
            productName.textContent = product.name;

            const productPrice = document.createElement('p');
            productPrice.textContent = `${product.price} ₴`;

            const addToCartBtn = document.createElement('button');
            addToCartBtn.classList.add('add-to-cart-btn');
            addToCartBtn.textContent = 'Додати в корзину';

            productInfoDiv.appendChild(productImage);
            productInfoDiv.appendChild(productName);
            productInfoDiv.appendChild(productPrice);
            productInfoDiv.appendChild(addToCartBtn);

            productDiv.appendChild(productInfoDiv);
            productsContainer.appendChild(productDiv);
        });
    }
}
