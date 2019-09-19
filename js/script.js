$(document).ready(function () {

    //////// Accordeon Section - Menu
    $(".accordeon__menu-btn").on("click", function (event) {
        event.preventDefault();

        var $this = $(this),
            item = $this.closest('.accordeon__menu-item'),
            list = $this.closest('.accordeon__menu-list'),
            items = list.find('.accordeon__menu-item'),
            content = item.find('accordeon__menu-drop'),
            otherContent = list.find('accordeon__menu-drop'),
            duration = 300;

        if (!item.hasClass('active')) {
            items.removeClass('active');
            item.addClass('active');

            content.stop(true, true).slideUp(duration);
            otherContent.stop(true, true).slideDown(duration);
        } else {
            content.stop(true, true).slideUp(duration);
            item.stop(true, true).removeClass('active');
        }
        $(".accordeon__menu-close").on("click", function (event) {
            event.preventDefault();

            if (item.hasClass('active')) {
                items.removeClass('active');
            }
        });
    });

////// Accordeon Section - Team


    $(".accordeon__item_btn").on("click", function (event) {
        event.preventDefault();

        var $this = $(this),
            item = $this.closest('.accordeon__item'),
            list = $this.closest('.accordeon__list'),
            items = list.find('.accordeon__item'),
            content = item.find('.accordeon__item-drop'),
            otherContent = list.find('.accordeon__item-drop'),
            duration = 300;

        if (!item.hasClass('active')) {
            items.removeClass('active');
            item.addClass('active');

            content.stop(true, true).slideUp(duration);
            otherContent.stop(true, true).slideDown(duration);
        } else {
            content.stop(true, true).slideUp(duration);
            item.stop(true, true).removeClass('active');
        }
        $(".accordeon__menu-close").on("click", function (event) {
            event.preventDefault();

            if (item.hasClass('active')) {
                items.removeClass('active');
            }
        });
    });


    ////// Ввод только цифр в форме
    const phone = document.querySelector('#phone');

    phone.addEventListener('keydown', function (event) {

        let isDigit = false;
        let isDash = false;
        let isControl = false;

        if (event.key >= 0 || event.key <= 9) {
            isDigit = true;
        }

        if (event.key == '-') {
            isDash = true;
        }

        if (event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace') {
            isControl = true;
        }

        if (!isDigit && !isDash && !isControl) {
            event.preventDefault();
        }
    });


/////// Section Form - Delivery

    ////// Валидация данных формы
    var myForm = document.querySelector("#myForm");
    var send = document.querySelector("#send");

    send.addEventListener('click', event => {
        event.preventDefault();

        if (validateForm(myForm)) {
            let data = new FormData(myForm);
            data.append("name", myForm.elements.name.value);
            data.append("phone", myForm.elements.phone.value);
            data.append("street", myForm.elements.street.value);
            data.append("build", myForm.elements.build.value);
            data.append("house", myForm.elements.house.value);
            data.append("room", myForm.elements.room.value);
            data.append("floor", myForm.elements.floor.value);
            data.append("comments", myForm.elements.comments.value);
            data.append("check", myForm.elements.check.value);
            data.append("checkbox", myForm.elements.checkbox.checked);


            const xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
            xhr.send(data);
            xhr.addEventListener('load', () => {
                if (response.status == "success") {
 
            const successOverlay = createOverlay("Сообщение отправлено");

            send.addEventListener("click", function () {
                document.body.appendChild(successOverlay);
            });

            function createOverlay(content) {
                const overlayElement = document.createElement("div");
                overlayElement.classList.add("overlay");

                const template = document.querySelector("#overlayTemplate");
                overlayElement.innerHTML = template.innerHTML;

                const closeElement = overlayElement.querySelector(".btn__overlay");
                closeElement.addEventListener("click", function () {
                    document.body.removeChild(overlayElement);
                });

                const contentElement = overlayElement.querySelector(".overlayContent");
                contentElement.innerHTML = content;

                return overlayElement;
            }
        
                }else{
                    console.log("failed");
                }
            });
        }
       
    });


    function validateForm(form) {
        let valid = true;

        if (!validateField(form.elements.name)) {
            valid = false;
        }

        if (!validateField(form.elements.phone)) {
            valid = false;
        }

        if (!validateField(form.elements.street)) {
            valid = false;
        }

        if (!validateField(form.elements.build)) {
            valid = false;
        }

        return valid;
    }

    function validateField(form__block) {
        form__block.nextElementSibling.textContent = form__block.validationMessage;
        return form__block.checkValidity();
    }



    ////// Section Slider


    const sliderList = document.querySelector('#sliderList');
    const left = document.querySelector('#left');
    const right = document.querySelector('#right');
    const computed = getComputedStyle(sliderList);


    right.addEventListener('click', function (e) {
        e.preventDefault();
        loop('right');

        right.style.animation = '1s';
    });

    left.addEventListener('click', function (e) {
        e.preventDefault();
        loop('left');

        left.style.animation = '1s';
    });


    function loop(direction) {
        if (direction === 'right') {
            sliderList.appendChild(sliderList.firstElementChild);
        } else {
            sliderList.insertBefore(sliderList.lastElementChild, sliderList.firstElementChild);
        }
    }
    
    ///// Map
    ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
            center: [53.196775, 50.102813],
            zoom: 9
        }, {
            searchControlProvider: 'yandex#search'
        }),
   
            // Создаём макет содержимого.
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),

            myPlacemark = new ymaps.Placemark([53.186366, 50.217595], {
                hintContent: 'Офис номер 2',
                balloonContent: 'Офис номер 2'
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: 'img/map-marker.svg',
                // Размеры метки.
                iconImageSize: [30, 42],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-5, -38]
            }),
            myPlacemark1 = new ymaps.Placemark([53.259544, 50.269163], {
                hintContent: 'Офис номер 3',
                balloonContent: 'Офис номер 3'
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: 'img/map-marker.svg',
                // Размеры метки.
                iconImageSize: [30, 42],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-30, -38]
            }),
            myPlacemark2 = new ymaps.Placemark([53.191657, 50.111235], {
                hintContent: 'Офис номер 4',
                balloonContent: 'Офис номер 4'
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: 'img/map-marker.svg',
                // Размеры метки.
                iconImageSize: [30, 42],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-5, -38]
            }),

            myPlacemarkWithContent = new ymaps.Placemark([53.204130, 50.201357], {
                hintContent: 'Офис номер 1',
            
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#imageWithContent',
                // Своё изображение иконки метки.
                iconImageHref: 'img/map-marker.svg',
                // Размеры метки.
                iconImageSize: [48, 48],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-24, -24],
                // Смещение слоя с содержимым относительно слоя с картинкой.
                iconContentOffset: [15, 15],
                // Макет содержимого.
                iconContentLayout: MyIconContentLayout
            });

        myMap.geoObjects
            .add(myPlacemark)
            .add(myPlacemark1)
            .add(myPlacemark2)
            .add(myPlacemarkWithContent);
            myMap.behaviors.disable('scrollZoom'); 
    });
 //Fullpage
/* $('#fullpage').fullpage({
        menu: "#myMenu"
        
    }); */

   

    ////PopUp Reviews
    $(".btn__reviews").on("click",function(e){
        e.preventDefault();

        $(".popup").addClass("active");
    });

    $(".close__popup").on("click", function (e) {
        e.preventDefault();

        $(".popup").removeClass("active");
    })

    //////PopUp Header

    $(".btn_mobile-hmbrgr").on("click", function (e) {
        e.preventDefault();

        $(".hamburger__popup").addClass("active");
    });

    $(".hamburger__popup-close").on("click", function (e) {
        e.preventDefault();

        $(".hamburger__popup").removeClass("active");
    })

    $(".nav__link").on("click", function (e) {

        $(".hamburger__popup").removeClass("active");
    });
});
