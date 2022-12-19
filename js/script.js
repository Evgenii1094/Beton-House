$(document).ready(function(){
    function valideForms(form){
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
            },
            messages: {
                name: "Пожалуйста, введите своё имя",
                phone: "Пожалуйста, введите свой номер телефона"
            }
        });
    };
    valideForms('#call');
    valideForms('#order form');

  });

  window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.catalog-tab'),
          tabsContent = document.querySelectorAll('.tabs-container-item'),
          tabsParent = document.querySelector('.tabs-link'),
          modalButton = document.querySelectorAll('[data-modal'),
          modalClose = document.querySelector('[data-close]'),
          modal = document.querySelector('#modal'),
          hamburgetBtn = document.querySelector('#hamburger-btn'),
          hamburgerMenu = document.querySelector('.overlay-hamburger'),
          hamburgerClose = document.querySelector('.hamburger-close'),
          anchors = document.querySelectorAll('a[href*="#"]'),
          showMore = document.querySelector('.review-btn'),
          reviewLength = document.querySelectorAll('.review-item').length;


    // Tabs
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('catalog-tab-active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('catalog-tab-active');
    }

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if(target && target.classList.contains('catalog-tab')) {
            tabs.forEach ((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);   
                }
            });
        }
    });

    hideTabContent();
    showTabContent();

    // Modal
    function openModal(item) {
        item.classList.remove('hide');
        item.classList.add('show', 'fade');
        document.body.style.overflow = 'hidden'; 
    }

    function closedWindow(item) {
        item.classList.remove('show');
        item.classList.add('hide');
        document.body.style.overflow = '';
    }

    modalButton.forEach(item => {
        item.addEventListener('click', () => {
            openModal(modal);
        });
    });

    modalClose.addEventListener('click', () => {
        closedWindow(modal);
    });

    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            closedWindow(modal);
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') {
            closedWindow(modal);
        }
    });

    // Hamburger menu
    hamburgetBtn.addEventListener('click', () => {
        openModal(hamburgerMenu);
    });

    hamburgerClose.addEventListener('click', () => {
        closedWindow(hamburgerMenu);
    });

    hamburgerMenu.addEventListener('click', (e) => {
        if(e.target === hamburgerMenu) {
            closedWindow(hamburgerMenu);
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') {
            closedWindow(hamburgerMenu);
        }
    });

    // Scrolling
    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            
            const blockID = anchor.getAttribute('href').substr(1);
            
            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // phone mask 
    let eventCalllback = function (e) {
        let el = e.target,
        clearVal = el.dataset.phoneClear,
        pattern = el.dataset.phonePattern,
        matrix_def = "+38 (___) ___-__-__",
        matrix = pattern ? pattern : matrix_def,
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = e.target.value.replace(/\D/g, "");
        if (clearVal !== 'false' && e.type === 'blur') {
            if (val.length < matrix.match(/([\_\d])/g).length) {
                e.target.value = '';
                return;
            }
        }
        if (def.length >= val.length) val = def;
        e.target.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
    }

    const phone_inputs = document.querySelectorAll('[data-phone-pattern]');
    for (let elem of phone_inputs) {
        for (let ev of ['input', 'blur', 'focus']) {
            elem.addEventListener(ev, eventCalllback);
        }
    }

    //Read more 
    const parentContainer = document.querySelector('.review');

    parentContainer.addEventListener('click', (e) => {
        const target = e.target,
              isReadMoreBtn = target.className.includes('read-more');

        if(!isReadMoreBtn) return;

        const currentText = e.target.parentNode.querySelector('.read-more__text');

        currentText.classList.toggle('inline');

        target.textContent = target.textContent.includes('Показать больше') ? "Скрыть" : "Показать больше";
    });

    //More review
    let reviewItems = 3;

    showMore.addEventListener('click', () => {
        reviewItems += 3;

        const array = Array.from(document.querySelector('.review').children);
              visibleItems = array.slice(0, reviewItems);

        visibleItems.forEach(el => el.classList.add('is-visible'));

        if(visibleItems.length === reviewLength) {
            showMore.classList.add('hide');
        }
    });
  });