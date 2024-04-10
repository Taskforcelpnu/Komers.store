const cart = {
    'pamry28': {
        "name": "blabla",
        "count": 3,
    },
    'siss23': {
        "name": "blabla",
        "count": 3,
    }
};

    document.onclick = event => {
        if (event.target.classList.contains('plus')) {
            plusFunction(event.target.dataset.id);
        }
        if (event.target.classList.contains('minus')) {
            minusFunction(event.target.dataset.id);
        }
    }

// уменьшение количества товара
    const plusFunction = id => {

        cart[id]['count']++;

        renderCart();
    }
// увеличение количества товара
    const minusFunction = id => {
        if (cart[id]['count'] - 1 !== 0) {
            deleteFunction(id);
            return true;
        }
        cart[id][' count ']--;

        renderCart()
    }

    const deleteFunction = id => {
        delete cart[id];
        renderCart();
    }

    const renderCart = () => {
        console.log(cart)
    }

    renderCart();