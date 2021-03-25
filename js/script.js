$(document).ready(function(){
    $('ul.tabs-link').on('click', 'li:not(.catalog-tab-active)', function() {
        $(this)
          .addClass('catalog-tab-active').siblings().removeClass('catalog-tab-active')
          .closest('div.tabs').find('div.tabs-container-item').removeClass('tabs-active').eq($(this).index()).addClass('tabs-active');
      });
      

    $('[data-modal=order]').on('click', function() {
        $('.overlay, #order').fadeIn('slow');
    });
    $('.modal-close').on('click', function() {
        $('.overlay, #order, #thanks').fadeOut('slow');
    });

    $('.btn-mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal-descr').text($('Заполни форму').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

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

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#call, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    $('.scrollto a').on('click', function() {

        let href = $(this).attr('href');
    
        $('html, body').animate({
            scrollTop: $(href).offset().top
        }, {
            duration: 350,   // по умолчанию «400» 
            easing: "linear" // по умолчанию «swing» 
        });
    
        return false;
    });

    $('[data-modal=burger]').on('click', function() {
        $('.overlay-hamburger, #hamburger-mobile').fadeIn('slow');
    });
    $('.button-mobile, .hamburger-close').on('click', function() {
        $('.overlay-hamburger, #hamburger-mobile').fadeOut('slow');
    });

  });