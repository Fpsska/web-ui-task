import db_products from '../../db.json';

const app = {
    state: {
        db_products: db_products.products,
        user_products: []
    },
    init() {
        // TODO: Add logic to handle current  PAGE for run only nessecery code
        console.log('init');

        const cardForm = document.querySelector('.card__form.form');
        if (cardForm) {
            cardForm.addEventListener('submit', (e) =>
                this.listeners('submit-card-form', e)
            );
        }

        const addProductBtn = document.querySelector('.title.title-green');
        if (addProductBtn) {
            addProductBtn.addEventListener('click', (e) => {
                this.listeners('handle-add-product-btn', e);
            });
        }

        const wrapper = document.querySelector('.form-choose__section_2');

        if (!wrapper || !this.state.db_products?.length) return;
        this.state.db_products.forEach((item) =>
            wrapper.appendChild(this.generateAvailableProduct(item))
        );

        this.listeners('register-products-listener');

        const productForm = document.querySelector('.form-choose');
        if (productForm)
            productForm.addEventListener('submit', (e) =>
                this.listeners('submit-products-form', e)
            );

        const contentForm = document.querySelector('.form-content');
        if (contentForm) {
            contentForm.addEventListener('submit', (e) =>
                this.listeners('submit-content-form', e)
            );
        }
    },
    generateAvailableProduct(item) {
        // render products from DB
        console.log('generateAvailableProduct');
        const product = document.createElement('fieldset');
        product.classList.add(
            'form-choose__column',
            item.isSelected ? 'selected' : 'form-choose__column'
        );
        product.innerHTML = `
        <input class="form-choose__input" type="radio" name="product" checked=${item.isSelected || false}>
        <span class="custom-radio"></span>
        <label class="form-choose__text">
            <span class="form-choose__title">${item.items.length} products for ${item.price?.full} usd ${item.price?.benefit ? `/ ${item.price.each}$ for each` : ''}</span>
            ${item.price?.benefit ? `<span class="form-choose__subtitle">You safe ${item.price.benefit}% on each patent check</span>` : ''} 
        </label>
        <span class="mask" id=${item.id}></span>
    `;
        return product;
    },
    renderProductTemplates() {
        // render user product list from selected DB product group
        console.log('renderProductTemplates');
        const selectedDBProduct = this.state.db_products.find(
            (item) => item.isSelected
        );
        const wrapper = document.querySelector('.content__section_1');
        if (!selectedDBProduct || !wrapper) return;

        this.state.user_products = [
            // TODO: remove conditions ||
            {
                ...selectedDBProduct,
                items: [
                    ...(this.state.user_products[0]?.items || []),
                    ...selectedDBProduct.items
                ],
                price: {
                    full:
                        this.state.user_products[0]?.price.full ||
                        0 + selectedDBProduct.price.full
                }
            }
        ];
        console.log('after merge>', this.state.user_products);

        const productTemplate = document.createElement('fieldset');
        productTemplate.classList.add(
            'form__fieldset',
            'form__fieldset-required'
        );

        for (let i = 0; i < this.state.user_products[0].items.length; i++) {
            const id = `${this.state.user_products[0].id}_product-${i + 1}`;
            const item = this.state.user_products[0].items[i];
            productTemplate.setAttribute('id', id);
            productTemplate.innerHTML = `
            <div class="form__section_2">
                <div class="form__title">
                    <span class="title">Product ${i + 1}</span>
                    <button class="btn-close" type="button" id=${id}></button>
                </div>
                <label class="subtitle">Enter main keyword for the product
                    <input class="form__input" type="text" placeholder="for example, sylicon wine cup" value=${item.name} required>
                </label>
                <label class="subtitle">Enter link to the similar product as a reference
                    <input class="form__input" type="url" placeholder="https://..." value=${item.url || ''}>
                </label>
            </div>
        `;
            wrapper.appendChild(productTemplate.cloneNode(true));
        }
        console.log('user_products>', this.state.user_products);
        this.listeners('register-delete-btn-listener');
    },
    selectProduct(e) {
        // TODO: mb overwrite (delete only changed items, based on deleteProduct method)
        console.log('selectProduct');
        const wrapper = document.querySelector('.form-choose__section_2');
        const targetId = e.target.getAttribute('id');
        if (!wrapper || !targetId) return;

        while (wrapper.firstChild) {
            // delete old nodes
            wrapper.removeChild(wrapper.firstChild);
        }

        const updatedPoducts = this.state.db_products.map((item) =>
            item.id === targetId
                ? { ...item, isSelected: true }
                : { ...item, isSelected: false }
        );
        updatedPoducts.forEach((item) =>
            wrapper.appendChild(this.generateAvailableProduct(item))
        );
        this.state.db_products = updatedPoducts;
        // console.log('updatedPoducts', updatedPoducts);

        const formButton = document.querySelector('.form-choose__button');
        if (
            formButton &&
            !this.state.db_products.every((item) => item.isSelected)
        )
            formButton.removeAttribute('disabled');

        this.listeners('register-products-listener');
    },
    setInitProduct() {
        console.log('setInitProduct');
        const cardForm = document.querySelector('.card__form.form');
        if (!cardForm) return;

        const formData = new FormData(cardForm);
        const name = formData.get('name');
        const email = formData.get('email');
        if (!name || !email) return;

        this.state.user_products = [
            {
                id: undefined,
                items: [{ name, email }],
                price: undefined
            }
        ];
    },
    deleteProduct(e) {
        console.log('deleteProduct');
        const targetId = e.target.getAttribute('id');
        const wrapper = document.querySelector('.content__section_1');
        if (!targetId || !wrapper) return;

        this.state.user_products = this.state.user_products.filter(
            (item) => item.id !== targetId
        );
        this.computeProductsPrice();
        console.log('user_products>', this.state.user_products);

        wrapper.childNodes.forEach((item) => {
            if (item.getAttribute('id') === targetId) wrapper.removeChild(item);
        });

        if (!this.state.user_products.length) {
            const form = document.querySelector('.form-content');
            if (!form) return;

            wrapper.style.display = 'none';

            const section = document.createElement('div');
            section.innerHTML =
                '<img src="../images/icon-back.png" alt="go back image">';
            section.classList.add('content__section_3');
            form.prepend(section);
        }
    },
    computeProductsPrice() {
        console.log('computeProductsPrice');
        const button = document.querySelector('.content__btn');
        const product = this.state.db_products.find((item) => item.isSelected);
        if (!button || !product) return;
        if (this.state.user_products.length === 0)
            return (button.innerHTML = 'Nothing selected. Go back');
        if (this.state.user_products.length === product.items)
            return (button.innerHTML = `Submit and Pay ${product.price.full} USD`);
        button.innerHTML = `Submit and Pay ${product.price.each * this.state.user_products.length} USD`;
    },
    listeners(type, e = null) {
        switch (type) {
            case 'handle-add-product-btn': {
                e.preventDefault();

                this.setInitProduct();
                window.location.replace('./assets/pages/products.html');
                break;
            }
            case 'submit-card-form': {
                e.preventDefault();

                this.setInitProduct();
                window.location.replace(
                    './assets/pages/successful_payment.html'
                );
                break;
            }
            case 'submit-products-form': {
                e.preventDefault();
                const content = document.querySelector('.content');
                const productForm = document.querySelector('.form-choose');
                if (!content || !productForm) return;

                productForm.style.display = 'none';
                content.style.display = 'block';
                this.renderProductTemplates();
                this.computeProductsPrice();

                // console.log(this.state.db_products);
                break;
            }
            case 'submit-content-form': {
                e.preventDefault();

                if (!this.state.user_products.length) {
                    return window.location.replace('../../index.html');
                }

                window.location.replace('./successful_payment.html');
                break;
            }
            case 'register-products-listener': {
                const productTemplatesMask = document.querySelectorAll('.mask');

                if (!productTemplatesMask?.length) return;
                productTemplatesMask.forEach((item) =>
                    item.addEventListener('click', (e) => this.selectProduct(e))
                );
                break;
            }
            case 'register-delete-btn-listener': {
                const deleteButtons = document.querySelectorAll('.btn-close');

                if (!deleteButtons?.length) return;
                deleteButtons.forEach((item) =>
                    item.addEventListener('click', (e) => this.deleteProduct(e))
                );
                break;
            }
            default:
                break;
        }
    }
};

app.init();
