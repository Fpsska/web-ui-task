document.addEventListener("DOMContentLoaded", () => {
    let productStack = document.querySelectorAll(".form-choose__column");
    let productText = document.querySelectorAll(".form-choose__subtitle");
    let inputs = document.querySelectorAll(".form-choose__input");


    productStack.forEach(item => {
        item.addEventListener("click", () => {
            productStack.forEach(item => {
                item.classList.remove("selected")
            })
            productText.forEach(item => {
                item.classList.remove("selected")
            })
            inputs.forEach(item => {
                item.removeAttribute("checked")
            })

            item.classList.add("selected");
            const elementIndex = Array.from(productStack).indexOf(item);
            if (productText[elementIndex] !== undefined) {
                productText[elementIndex].classList.add("selected");
            }


            let reverseIdx = Array.from(productStack).reverse().indexOf(item)
            switchNumber(reverseIdx + 1);


            inputs[elementIndex].setAttribute("checked", "")

            switchButton.removeAttribute("disabled");
        })
    });

    // /. active products

    // let closeBtn = document.querySelector(".btn-close");
    // let productBlock = document.querySelectorAll(".form__section_2");


    // closeBtn.addEventListener("click", () => {  // убирает конкрентный блок form__section_2
    //     productBlock.forEach(item => {
    //         item.classList.add("hidden");
    //     })
    // })

    // /.remove product

    let switchButton = document.querySelector(".form-choose__button");

    let content = document.querySelector(".content");
    let formChoose = document.querySelector(".form-choose");

    switchButton.addEventListener("click", () => {
        content.style.setProperty("display", "block", "important");
        formChoose.style.setProperty("display", "none", "important");
    })

    let templateParent = document.querySelector(".content__section_1");

    let switchNumber = (number) => {
        for (let i = 2; i <= number; i++) {
            let templateItem = document.querySelector(".form__fieldset").cloneNode(true);
            templateItem.querySelector(".title").innerText=`Products ${i}`;
            templateParent.appendChild(templateItem);
        }
    }


    // /. dublicate template

})