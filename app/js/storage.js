'use strict';

(function() {    
    class Storage {
        _localStorageName = `stolstyle-products`;
        _productQuantity = 0;
        _storageData = {
            date: ``,
            products: []
        };

        constructor() {
            // Инициализируем хранилище
            this.initStorage();
        }

        initStorage() {
            this.createDate();
            this.checkLocalStorage();
        }

        addProductToStorage(productData) {
            // Проверяем существует ли такоей продукт в хранилище
            if (this.findStorageProduct(productData)) {
                this.updateStorageProductQuantity(productData);
                return;
            }
            // Обновляем данные хранилища
            this.updateStorageProducts(productData);
            // Обновляем дату
            this.createDate();
            // Обновляем локальное хранилище
            this.updateLocalStorage();
            // Обновляем количество продуктов
            this.updateProductQuantity();
        }

        getLocalStorageData() {
            return JSON.parse(localStorage.getItem(this._localStorageName));
        }

        updateLocalStorage() {
            // Очищаем локальное хранилище перед обновлением
            localStorage.removeItem(this._localStorageName);
            // Добавляем данные в локальное хранилище
            localStorage.setItem(this._localStorageName, JSON.stringify(this._storageData));
        }

        deleteLocalStorage() {
            // Очищаем локальное хранилище перед обновлением
            localStorage.removeItem(this._localStorageName);
        }

        checkLocalStorage() {
            const localStorageData = this.getLocalStorageData();

            if (localStorageData) {
                if (localStorageData.date !== this._storageData.date) {
                    // Удаляем данные из локального хранилища
                    localStorage.removeItem(this._localStorageName);
                    return;
                }
                // Заполняем хранилище данными
                this.updateStorageProducts(localStorageData.products);
                this.updateProductQuantity();
            }
        }

        updateProductQuantity() {
            this._productQuantity = this._storageData.products.length;

            if (this._productQuantity === 0) {
                this.deleteLocalStorage();
            }
        }

        getProductQuantity() {
            return this._productQuantity;
        }

        createDate() {
            // Создаем текущую дату в нужном формате для проверки актуальности данных
            const now = new Date();
            this._storageData.date = `${now.getDate()}.${now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}`: now.getMonth() + 1}.${now.getFullYear()}`;
        }

        updateStorageProducts(productData) {
            if (Array.isArray(productData)) {
                this._storageData.products = productData;
                return;
            }
            this._storageData.products.push(productData);
        }

        getStorageProducts() {
            return this._storageData.products;
        }

        removeStorageProduct(id) {
            // Удаляем продукт из хранилища
            this._storageData.products = this._storageData.products.filter(storageDataProduct => storageDataProduct.id !== id);
            // Обновляем дату
            this.createDate();
            // Обновляем локальное хранилище
            this.updateLocalStorage();
            // Обновляем количество товара
            this.updateProductQuantity();
        }

        updateStorageProduct(productId, newProductQuantity, newProductPrice) {
            // Находим наш товар
            const product = this._storageData.products.find(storageDataProduct => storageDataProduct.id === productId);
            const productIndex = this._storageData.products.findIndex(storageDataProduct => storageDataProduct.id === productId);
            // Обновляем данные товара
            product.quantity = newProductQuantity;
            product.price = newProductPrice;
            // Вставляем обновленный товар обратно
            this._storageData.products.splice(productIndex, 1, product);
            // Обновляем дату
            this.createDate();
            // Обновляем локальное хранилище
            this.updateLocalStorage();
        }

        clearStorage() {
            this._storageData.date = ``;
            this._storageData.products  = [];
            this.updateProductQuantity(0);
        }

        updateStorageProductQuantity(productData) {
            // Находим наш товар
            const product = this._storageData.products.find(storageDataProduct => storageDataProduct.productId === productData.productId);
            const productIndex = this._storageData.products.findIndex(storageDataProduct => storageDataProduct.productId === productData.productId);
            const productPricePerOne = product.price / product.quantity;
            // Обновляем данные товара
            product.quantity += 1;
            product.price = +(productPricePerOne * product.quantity).toFixed(1);
            // Вставляем обновленный товар обратно
            this._storageData.products.splice(productIndex, 1, product);
            // Обновляем дату
            this.createDate();
            // Обновляем локальное хранилище
            this.updateLocalStorage();
        }

        findStorageProduct(productData) {
            if (productData.productId) {
                return this._storageData.products.find(storageDataProduct => storageDataProduct.productId === productData.productId) ? true : false;
            }
            return this._storageData.products.find(storageDataProduct => storageDataProduct.id === productData.id) ? true : false;
        }
    }

    const storageInstance = new Storage();
    window.storage = {
        instance: storageInstance
    };
})();