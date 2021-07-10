document.addEventListener("DOMContentLoaded", () => {
    let productStack = document.querySelectorAll(".form-choose__column");
    let productText = document.querySelectorAll(".form-choose__subtitle");
    let inputs = document.querySelectorAll(".form-choose__input");


    productStack.forEach(item => {
        item.addEventListener("click", () => {
            productStack.forEach(item => {    // убирает всем элементам form-choose__column класс "selected"
                item.classList.remove("selected")
            })
            productText.forEach(item => {     // убирает всем элементам form-choose__subtitle класс "selected" 
                item.classList.remove("selected")
            })
            inputs.forEach(item => {
                item.removeAttribute("checked") // убирает всем элементам form-choose__input атрибут "checked" 
            })
            // /. удаление классов по клику

            item.classList.add("selected");     // добавляет класс selected элементу form-choose__column

            const elementIndex = Array.from(productStack).indexOf(item); // получение индекса каждого элемента form-choose__column 


            if (productText[elementIndex] !== undefined) {               // выдаёт класс selected, при отсутствия класса form-choose__subtitle 
                productText[elementIndex].classList.add("selected");
            }


            let reverseIdx = Array.from(productStack).reverse().indexOf(item) // реверс массива для вывода товара в правильном порядке
            switchNumber(reverseIdx + 1);                                     // прибавляет к реверсированному массиву 1 элемент (блок form__fieldset)


            inputs[elementIndex].setAttribute("checked", "")  // устанавливет атрибут checked выбранному элементу INPUT в зависимости от индекса
            switchButton.removeAttribute("disabled");         // делает кноку Continue интерактивной (по умолчанию установлен disabled)
        })
    });

    // /. active products

    // Task: элемент находится за пределом скрола родительского элемента - убираем атрибут required 

    // let closeBtn = document.querySelector(".btn-close");
    let product = document.querySelector(".form__section-required");
    let productContainer = document.querySelector(".form-content");

    let parentVH = productContainer.offsetHeight; // высота блока form-content
    console.log(parentVH)
    let blockPosition = product.offsetHeight;        // положение блока form__fieldset от верха родителя form-content
    console.log(blockPosition)

    let productInput = document.querySelector(".form__input")







    // closeBtn.addEventListener("click", () => {  // убирает конкрентный блок form__section_2
    //     productBlock.forEach(item => {
    //         item.classList.add("hidden");
    //     })
    // })

    // /.remove product


    // /. remove popup required message
    let switchButton = document.querySelector(".form-choose__button");

    let content = document.querySelector(".content");
    let formChoose = document.querySelector(".form-choose");

    switchButton.addEventListener("click", () => {  // менят порядок отображение блоков по нажатию кнопки Continue 
        content.style.setProperty("display", "block", "important");
        formChoose.style.setProperty("display", "none", "important");
    })

    let templateParent = document.querySelector(".content__section_1");

    let switchNumber = (number) => {          // функция динамического изменения порядкового значения элемента .title
        for (let i = 2; i <= number; i++) {  // пока итерируемый элемент (i) будет меньше, или равен входящему числу number
            let templateItem = document.querySelector(".form__fieldset").cloneNode(true);  // клонирует выбранную HTML-структуру элементов 
            templateItem.querySelector(".title").innerText = `Products ${i}`;              // меняет дочернему элементу .title текстовый контент
            templateParent.appendChild(templateItem);                                      // добавляет изменённый элемент .title в конец списка дочерних элементов
        }

        // изменение цены ТУТ
        let payBtn = document.querySelector(".content__btn");


        // /. dublicate template
    }



})