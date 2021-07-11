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

            // /. deleting classes / attribute on click event

            item.classList.add("selected");

            const elementIndex = Array.from(productStack).indexOf(item); // get the index of each form-choose__column item


            if (productText[elementIndex] !== undefined) {               // assigns the selected class if there is no form-choose__subtitle class
                productText[elementIndex].classList.add("selected");
            }


            let reverseIdx = Array.from(productStack).reverse().indexOf(item) // reverse the array to display the product in the correct order
            switchNumber(reverseIdx + 1);                                     // add 1 element to the reversed array (form__fieldset block)


            inputs[elementIndex].setAttribute("checked", "");  // sets the checked attribute of the selected INPUT element based on the index
            switchButton.removeAttribute("disabled");         // makes the Continue button interactive (disabled by default)
        })
    });

    // /. active products


    let switchButton = document.querySelector(".form-choose__button");
    let content = document.querySelector(".content");
    let formChoose = document.querySelector(".form-choose");

    switchButton.addEventListener("click", () => {  // changes the order of displaying blocks by pressing the Continue button
        content.style.display = "block";
        formChoose.style.display = "none";
    })

    let templateParent = document.querySelector(".content__section_1");


    let switchNumber = (number) => {              // function for creating the required number of elements form__fieldset
        let templateItem = document.querySelector(".form__fieldset").cloneNode(true);  // clones the selected HTML structure of the first form__fieldset element

        while (templateParent.firstChild) {       // clears the list of form__fieldset elements
            templateParent.removeChild(templateParent.firstChild);
        }
        templateParent.appendChild(templateItem); // creates the first element

        // /. resetting the product list



        for (let i = 2; i <= number; i++) {
            let templateItem = document.querySelector(".form__fieldset").cloneNode(true);
            templateItem.querySelector(".title").innerText = `Products ${i}`;              // change the text content of the .title child
            templateParent.appendChild(templateItem);                                      // adds a new modified block element to the end of the list of children
            templateItem.setAttribute("data-mark", `${i}`);
        }

        // /. dublicate template

        let counter = number;  // current number of items in the cart
        let productBlocks = document.querySelectorAll(".form__fieldset");
        productBlocks.forEach(item => {
            item.querySelector(".btn-close").addEventListener("click", () => {
                if (item.parentNode) {
                    item.parentNode.removeChild(item);
                }
                counter -= 1;
                payGenerate(counter);
            })
        })

        // /.remove product

        let payGenerate = (value) => {
            const sumArr = [24.99, 44, 60, 72, 80];  // price list

            if (value <= 0) {
                document.querySelector(".content__btn").innerText = "Nothing selected";
            } else {
                document.querySelector(".content__btn").innerText = `Submit and Pay ${sumArr[value - 1]} USD`;
            }

            if (document.querySelector(".content__btn").innerText == 'Nothing selected') {
                document.querySelector(".content__btn").addEventListener("click", () => {
                    window.location.replace('./failed_payment.html');
                })
            }
        }
        payGenerate(number);

        // /.price change

    }


    // Task: элемент находится за пределом скрола родительского элемента - убираем атрибут required 

    // getComputedStyle(content).display == 'block'


    // requiredPopup()



    // let productOffset = document.querySelector(".form__section-required").offsetTop;

    // let blockPosition = product.offsetHeight;        // положение блока form__fieldset от верха родителя form-content
    // console.log(blockPosition)

    // let productInput = document.querySelector(".form__input")



    // /. remove popup required message

})