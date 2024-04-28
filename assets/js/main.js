document.addEventListener("DOMContentLoaded", () => {
    generateProductTemplates(products); // TODO: run if current page is products.html
    handleSelectProduct();
})

const products = [
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
]

const generateProductTemplates = (productsArray) => {
    const productWrapper = document.querySelector('.form-choose__section_2');

    if (!productWrapper || !products?.length) return;

    const getProductTemplate = (data) => {
        const product = document.createElement('fieldset');
        product.classList.add('form-choose__column');
        product.innerHTML = `
            <input class="form-choose__input" type="radio" name="product" checked=${data.isSelected}>
            <span class="custom-radio"></span>
            <label class="form-choose__text">
                <span class="form-choose__title">${data.items} products for ${data.price.full} usd ${data.price.benefit ? `/ ${data.price.each}$ for each` : ''}</span>
                ${data.price.benefit ? `<span class="form-choose__subtitle">You safe ${data.price.benefit}% on each patent check</span>` : ''} 
            </label>
        `
        return product;
    }

    [...productsArray.reverse()].forEach((item) => productWrapper.appendChild(getProductTemplate(item)));
}

// const switchNumber = (number) => {            
//     // function for creating the required number of elements form__fieldset
//     const productTemplate = document.querySelector(".form__fieldset").cloneNode(true);  // clones the selected HTML structure of the first form__fieldset element
//     const parentTemplate = document.querySelector(".content__section_1");

//     // while (parentTemplate.firstChild) {       // clears the list of form__fieldset elements
//     //     parentTemplate.removeChild(parentTemplate.firstChild);
//     // }
//     parentTemplate.appendChild(productTemplate); // creates the first element

//     // /. resetting the product list

//     for (let i = 2; i <= number; i++) {
//         let productTemplate = document.querySelector(".form__fieldset").cloneNode(true);
        
//         productTemplate.querySelector(".title").innerText = `Product ${i}`;              // change the text content of the .title child
//         parentTemplate.appendChild(productTemplate);                                     // adds a new modified block element to the end of the list of children
//         productTemplate.setAttribute("data-mark", `${i}`);
//     }

//     // /. dublicate template

//     let counter = number;  // current number of items in the cart
//     const productBlocks = document.querySelectorAll(".form__fieldset");

//     productBlocks.forEach(item => {
//         item.querySelector(".btn-close").addEventListener("click", () => {
//             if (item.parentNode) item.parentNode.removeChild(item);

//             counter -= 1;
//             payGenerate(counter);
//         })
//     })

//     // /.remove product




// }


const payGenerate = (value) => {
    // /.price change
    const contentButton = document.querySelector(".content__btn");
    const sumArr = [24.99, 44, 60, 72, 80];  // price list

    if (value <= 0) {
        contentButton.innerText = "Nothing selected";
    } else {
        contentButton.innerText = `Submit and Pay ${sumArr[value - 1]} USD`;
    }

    if (contentButton.innerText == 'Nothing selected') {
        contentButton.addEventListener("click", () => window.location.replace('./failed_payment.html'))
    }
}

const handleSelectProduct = () => {
    const productTemplates = document.querySelectorAll(".form-choose__column");
    const productLabels = document.querySelectorAll(".form-choose__subtitle");
    const productInputs = document.querySelectorAll(".form-choose__input");

    const content = document.querySelector(".content");
    const productForm = document.querySelector(".form-choose");
    const productFormButton = document.querySelector(".form-choose__button");

    productFormButton.addEventListener("click", () => {  
        // changes the order of displaying blocks by pressing the Continue button
        content.style.display = "block";
        productForm.style.display = "none";
    })

    productTemplates.forEach(item => {
        item.addEventListener("click", () => {
            productTemplates.forEach(item => item.classList.remove("selected"));
            productLabels.forEach(item => item.classList.remove("selected"));
            productInputs.forEach(item => item.removeAttribute("checked"));

            // /. deleting classes / attribute by onClick event

            item.classList.add("selected");

            const targetProductTemplateIdx = Array.from(productTemplates).indexOf(item); // get the index of each form-choose__column item

            if (productLabels[targetProductTemplateIdx]) {               
                // assigns the selected class if there is no form-choose__subtitle class
                productLabels[targetProductTemplateIdx].classList.add("selected");
            }

            if (productInputs[targetProductTemplateIdx]) {
                // sets the checked attribute of the selected INPUT element based on the index
                productInputs[targetProductTemplateIdx].setAttribute("checked", "");  
            }

            productFormButton.removeAttribute("disabled"); // makes the Continue button interactive (disabled by default)

            // const reverseIdx = Array.from(productTemplates).reverse().indexOf(item) // reverse the array to display the product in the correct order
            // switchNumber(reverseIdx + 1);  // add 1 element to the reversed array (form__fieldset block)
        })
    });
}