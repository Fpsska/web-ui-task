const app = {
state: {
    products: [
        {
            id: 'uu_id_1',
            items: 1,
            price: {
                full: 24.99,
            },
            isSelected: false
        },
        {
            id: 'uu_id_2',
            items: 2,
            price: {
                full: 44,
                each: 22,
                benefit: 12
            },
            isSelected: false
        },    
        {
            id: 'uu_id_3',
            items: 3,
            price: {
                full: 60,
                each: 20,
                benefit: 20
            },
            isSelected: false
        },
        {
            id: 'uu_id_4',
            items: 4,
            price: {
                full: 72,
                each: 18,
                benefit: 28
            },
            isSelected: false
        },
        {
            id: 'uu_id_5',
            items: 5,
            price: {
                full: 80,
                each: 16,
                benefit: 36
            },
            isSelected: false
        }
    ],
},
init() {
    console.log('init');
    const productWrapper = document.querySelector('.form-choose__section_2');

    if (!productWrapper || !this.state.products?.length) return;
    this.state.products.forEach((item) => productWrapper.appendChild(this.generateAvailableProduct(item)));

    this.actions('register-products-listener');

    const productForm = document.querySelector(".form-choose");
    if (productForm) productForm.addEventListener('submit', (e) => this.actions('submit-products-form', e));
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
    const product = this.state.products.find((item) => item.isSelected);
    const wrapper = document.querySelector('.content__section_1');
    if (!product || !wrapper) return;

    const productTemplate = document.createElement('fieldset');
    productTemplate.classList.add("form__fieldset", "form__fieldset-required");
    
    for (let i = 0; i < product.items; i ++) {
        productTemplate.innerHTML = `
            <div class="form__section_2">
                <div class="form__title">
                    <span class="title">Product ${i + 1}</span>
                    <button class="btn-close" type="button"></button>
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
},
selectProduct(e) {
    console.log('selectProduct');
    const productWrapper = document.querySelector('.form-choose__section_2');
    const targetId = e.target.getAttribute('id');

    if (!productWrapper || !targetId) return;

    while (productWrapper.firstChild) {  
        // delete old nodes
        productWrapper.removeChild(productWrapper.firstChild);
    }

    const updatedPoducts = this.state.products.map((item) => item.id === targetId ? {...item, isSelected: true} : {...item, isSelected: false});
    updatedPoducts.forEach((item) => productWrapper.appendChild(this.generateAvailableProduct(item)));
    this.state.products = updatedPoducts;
    // console.log('updatedPoducts', updatedPoducts);

    const formButton = document.querySelector('.form-choose__button');
    if (formButton && !this.state.products.every((item) => item.isSelected)) formButton.removeAttribute('disabled');

    this.actions('register-products-listener');
},
computeProductsPrice() {
    console.log('computeProductsPrice');
    const button = document.querySelector(".content__btn");
    const product = this.state.products.find((item) => item.isSelected);
    if (!button || !product) return;
    button.innerHTML = `Submit and Pay ${product.price.full} USD`
},
actions(type, e = null) {
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
            console.log(this.state.products, e);
            break;
        case 'register-products-listener':
            const productTemplatesMask = document.querySelectorAll(".mask");

            if (!productTemplatesMask?.length) return;
            productTemplatesMask.forEach((item) => item.addEventListener('click', (e) => this.selectProduct(e)));
            break;
        default:
            break;
    }
},
};

app.init();