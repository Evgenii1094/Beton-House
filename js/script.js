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

    $(".form-phone").mask("+38 (999) 999-99-99");

  });

  window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.catalog-tab'),
          tabsContent = document.querySelectorAll('.tabs-container-item'),
          tabsParent = document.querySelector('.tabs-link'),
          modalButton = document.querySelectorAll('[data-modal'),
          modalClose = document.querySelector('[data-close'),
          modal = document.querySelector('#modal'),
          hamburgetBtn = document.querySelector('#hamburger-btn'),
          hamburgerMenu = document.querySelector('.overlay-hamburger'),
          hamburgerClose = document.querySelector('.hamburger-close'),
          anchors = document.querySelectorAll('a[href*="#"]');

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

  });