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
    console.log('INIT');
    const productWrapper = document.querySelector('.form-choose__section_2');

    if (!productWrapper || !this.state.products?.length) return;
    this.state.products.forEach((item) => productWrapper.appendChild(this.generate(item)));

    const productTemplatesMask = document.querySelectorAll(".mask");
    if (!productTemplatesMask?.length) return;
    productTemplatesMask.forEach((item) => item.addEventListener('click', (e) => {
        console.log(item);
        this.update(e);
    }));
},
generate(item) {
    console.log('GENERATE', item);
    const product = document.createElement('fieldset');
    product.classList.add('form-choose__column', item.isSelected ? 'selected' : 'form-choose__column');
    product.setAttribute('id', item.id);
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
update(e) {
    console.log('UPDATE');
    const productWrapper = document.querySelector('.form-choose__section_2');
    const targetId = e.target.getAttribute('id');

    if (!productWrapper || !targetId) return;
    while (productWrapper.firstChild) {   // TODO: broke logic of selecting input ? 
        // delete old nodes
        productWrapper.removeChild(productWrapper.firstChild);
    }

    const updatedPoducts = this.state.products.map((item) => item.id === targetId ? {...item, isSelected: true} : {...item, isSelected: false});
    updatedPoducts.forEach((item) => productWrapper.appendChild(this.generate(item)));
    console.log('updatedPoducts', updatedPoducts)
},
action(e) {
    if (e === 'formSubmiting') {
        const productForm = document.querySelector(".form-choose");

        if (!productForm) return;
    
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (products.every((item) => !item.isSelected)) return;
    
            //     content.style.display = "block";
            //     productForm.style.display = "none";
            console.log(e)
        })
    }
},
};

app.init();