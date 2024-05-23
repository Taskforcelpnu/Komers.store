import APIService from './ApiService.js';

describe('APIService', () => {
    let apiService;

    beforeEach(() => {
        apiService = new APIService();
        global.fetch = jest.fn();
        delete window.location;
        window.location = { reload: jest.fn() };
        window.closeModal = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getProducts', () => {
        it('should fetch products successfully', async () => {
            const mockProducts = [{ id: 1, name: 'Product 1' }];
            fetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockProducts),
            });

            const products = await apiService.getProducts();
            expect(products).toEqual(mockProducts);
            expect(fetch).toHaveBeenCalledWith(`${apiService.baseUrl}/products`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
        });

        it('should throw an error if fetching fails', async () => {
            fetch.mockResolvedValueOnce({ ok: false });

            await expect(apiService.getProducts()).rejects.toThrow('Failed to fetch products');
        });
    });

    describe('createProduct', () => {
        it('should create a product successfully', async () => {
            fetch.mockResolvedValueOnce({ ok: true });

            const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

            await apiService.createProduct({ name: 'New Product' });

            expect(fetch).toHaveBeenCalledWith(`${apiService.baseUrl}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: 'New Product' }),
            });
            expect(alertMock).toHaveBeenCalledWith('Товар успішно створено');
            expect(window.location.reload).toHaveBeenCalled();

            alertMock.mockRestore();
        });

        it('should show an error alert if product creation fails', async () => {
            fetch.mockResolvedValueOnce({ ok: false });

            const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

            await apiService.createProduct({ name: 'New Product' });

            expect(alertMock).toHaveBeenCalledWith('Помилка при створенні товару');
            alertMock.mockRestore();
        });
    });

    describe('orderProducts', () => {
        it('should order products successfully', async () => {
            const mockOrder = { orderId: 123 };
            fetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockOrder),
            });

            const consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {});
            const windowOpenMock = jest.spyOn(window, 'open').mockImplementation(() => {});

            await apiService.orderProducts([{ id: 1, name: 'Product 1' }]);

            expect(fetch).toHaveBeenCalledWith(`${apiService.orderUrl}/add-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify([{ id: 1, name: 'Product 1' }]),
            });
            expect(consoleLogMock).toHaveBeenCalledWith('Замовлення успішно відправлено:', mockOrder);
            expect(window.closeModal).toHaveBeenCalled();
            expect(windowOpenMock).toHaveBeenCalledWith('/order-list.html', "_self");

            consoleLogMock.mockRestore();
            windowOpenMock.mockRestore();
        });

        it('should show an error alert if ordering fails', async () => {
            fetch.mockResolvedValueOnce({ ok: false });

            const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

            await apiService.orderProducts([{ id: 1, name: 'Product 1' }]);

            expect(alertMock).toHaveBeenCalledWith('Помилка при створенні замовлення');
            alertMock.mockRestore();
        });
    });
});
