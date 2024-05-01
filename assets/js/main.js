const app = {
state: {
    db_products: [
        {
            id: 'group-1',
            items: 1,
            price: {
                full: 24.99,
            },
            isSelected: false
        },
        {
            id: 'group-2',
            items: 2,
            price: {
                full: 44,
                each: 22,
                benefit: 12
            },
            isSelected: false
        },    
        {
            id: 'group-3',
            items: 3,
            price: {
                full: 60,
                each: 20,
                benefit: 20
            },
            isSelected: false
        },
        {
            id: 'group-4',
            items: 4,
            price: {
                full: 72,
                each: 18,
                benefit: 28
            },
            isSelected: false
        },
        {
            id: 'group-5',
            items: 5,
            price: {
                full: 80,
                each: 16,
                benefit: 36
            },
            isSelected: false
        }
    ],
    user_products: [],
},
init() {
    console.log('init');
    const wrapper = document.querySelector('.form-choose__section_2');

    if (!wrapper || !this.state.db_products?.length) return;
    this.state.db_products.forEach((item) => wrapper.appendChild(this.generateAvailableProduct(item)));

    this.listeners('register-products-listener');

    const productForm = document.querySelector(".form-choose");
    if (productForm) productForm.addEventListener('submit', (e) => this.listeners('submit-products-form', e));
},
generateAvailableProduct(item) {
    console.log('generateAvailableProduct');
    const product = document.createElement('fieldset');
    product.classList.add('form-choose__column', item.isSelected ? 'selected' : 'form-choose__column');
    product.innerHTML = `
        <input class="form-choose__input" type="radio" name="product" checked=${item.isSelected}>
        <span class="custom-radio"></span>
        <label class="form-choose__text">
            <span class="form-choose__title">${item.items} products for ${item.price?.full} usd ${item.price?.benefit ? `/ ${item.price.each}$ for each` : ''}</span>
            ${item.price?.benefit ? `<span class="form-choose__subtitle">You safe ${item.price.benefit}% on each patent check</span>` : ''} 
        </label>
        <span class="mask" id=${item.id}></span>
    `;
    return product;
},
renderProductTemplates() {
    console.log('renderProductTemplates');
    const product = this.state.db_products.find((item) => item.isSelected);
    const wrapper = document.querySelector('.content__section_1');
    if (!product || !wrapper) return;

    this.state.user_products = Array.from({ length: product.items }, (_,idx) =>  ({id: `${product.id}__product-${idx + 1}`}));
    const productTemplate = document.createElement('fieldset');
    productTemplate.classList.add("form__fieldset", "form__fieldset-required");
    
    for (let i = 0; i < this.state.user_products.length; i ++) {
        const id = this.state.user_products[i].id;
        productTemplate.setAttribute('id', id);
        productTemplate.innerHTML = `
            <div class="form__section_2">
                <div class="form__title">
                    <span class="title">Product ${i + 1}</span>
                    <button class="btn-close" type="button" id=${id}></button>
                </div>
                <label class="subtitle">Enter main keyword for the product
                    <input class="form__input" type="text" placeholder="for example, sylicon wine cup" value="for example, sylicon wine cup" required>
                </label>
                <label class="subtitle">Enter link to the similar product as a reference
                    <input class="form__input" type="url" placeholder="https://..." value="https://..." required>
                </label>
            </div>
        `;
        wrapper.appendChild(productTemplate.cloneNode(true));
    }
    console.log('user_products>', this.state.user_products);
    this.listeners('register-delete-btn-listener');
},
selectProduct(e) { // TODO: mb overwrite (delete only changed items, based on deleteProduct method)
    console.log('selectProduct');
    const wrapper = document.querySelector('.form-choose__section_2');
    const targetId = e.target.getAttribute('id');

    if (!wrapper || !targetId) return;

    while (wrapper.firstChild) {  
        // delete old nodes
        wrapper.removeChild(wrapper.firstChild);
    }

    const updatedPoducts = this.state.db_products.map((item) => item.id === targetId ? {...item, isSelected: true} : {...item, isSelected: false});
    updatedPoducts.forEach((item) => wrapper.appendChild(this.generateAvailableProduct(item)));
    this.state.db_products = updatedPoducts;
    // console.log('updatedPoducts', updatedPoducts);

    const formButton = document.querySelector('.form-choose__button');
    if (formButton && !this.state.db_products.every((item) => item.isSelected)) formButton.removeAttribute('disabled');

    this.listeners('register-products-listener');
},
deleteProduct(e) {
    console.log('deleteProduct');
    const targetId = e.target.getAttribute('id');
    const wrapper = document.querySelector('.content__section_1');
    if (!targetId || !wrapper) return;

    this.state.user_products = this.state.user_products.filter((item) => item.id !== targetId);
    this.computeProductsPrice();
    console.log('user_products>', this.state.user_products);

    wrapper.childNodes.forEach((item) => {
       if (item.getAttribute('id') === targetId) wrapper.removeChild(item);
    });
},
computeProductsPrice() {
    console.log('computeProductsPrice');
    const button = document.querySelector(".content__btn");
    const product = this.state.db_products.find((item) => item.isSelected);
    if (!button || !product) return;
    if (this.state.user_products.length === 0) return button.innerHTML = "Nothing selected";
    if (this.state.user_products.length === product.items) return button.innerHTML = `Submit and Pay ${product.price.full} USD`;
    button.innerHTML = `Submit and Pay ${product.price.each * this.state.user_products.length} USD`;
},
listeners(type, e = null) {
    switch (type) {
        case 'submit-products-form':
            e.preventDefault();
            const content = document.querySelector(".content");
            const productForm = document.querySelector(".form-choose");

            if (!content || !productForm) return;
            content.style.display = "block";
            productForm.style.display = "none";
            this.renderProductTemplates();
            this.computeProductsPrice();
            console.log(this.state.db_products);
            // window.location.replace('./successful_payment.html');
            // window.location.replace('./index.html');
            break;
        case 'register-products-listener':
            const productTemplatesMask = document.querySelectorAll(".mask");

            if (!productTemplatesMask?.length) return;
            productTemplatesMask.forEach((item) => item.addEventListener('click', (e) => this.selectProduct(e)));
            break;
        case 'register-delete-btn-listener':
            const deleteButtons = document.querySelectorAll(".btn-close");

            if (!deleteButtons?.length) return;
            deleteButtons.forEach((item) => item.addEventListener('click', (e) => this.deleteProduct(e)));
        default:
            break;
    }
},
};

app.init();