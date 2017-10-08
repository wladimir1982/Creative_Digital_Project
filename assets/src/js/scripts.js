;
(function ($) {

//    Slick slider Begin

$('.works__slider').slick({
        dots: true,
        infinite: true,
    });

//    Slick slider End


// Responsive Slider Begin

    $('.team__slider').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
// Responsive Slider End


    // Google Karta Start

    $(window).on('load', function () {
        var map = null;

        function createMap() {

            var $markers = $('.marker');

            map = new google.maps.Map($('.map')[0], {
                zoom: 14,
                center: new google.maps.LatLng(0, 0),
                scrollwheel: false
            });

            addMarkers($markers, map);
            centerMap($markers, map);
        }

        function addMarkers($markers, map) {
            $markers.each(function () {
                var lat = $(this).data('lat');
                var lng = $(this).data('lng');
                var icon = $(this).data('icon');
                var marker = new google.maps.Marker({
                    position: { lat: lat, lng: lng },
                    map: map,
                    icon: icon
                });

                var content = $(this).find('.description').html();

                var infoWindow = new google.maps.InfoWindow({
                    content: content
                });

                marker.addListener('click', function () {
                    infoWindow.open(map, marker);
                });
            });
        }

        function centerMap($markers, map) {

            if ($markers.length == 1) {

                var lat = $markers.data('lat');
                var lng = $markers.data('lng');
                var latLng = new google.maps.LatLng(lat, lng);
                map.setCenter(latLng);
            } else {

                var bounds = new google.maps.LatLngBounds();

                $markers.each(function () {
                    var lat = $(this).data('lat');
                    var lng = $(this).data('lng');
                    var latLng = new google.maps.LatLng(lat, lng);
                    bounds.extend(latLng);
                });

                map.fitBounds(bounds);
            }
        }

        createMap();
    });

    // Google Karta End


    //    Кнопка вверх (.btn_up) Begin

    $('body').append('<button class="btn_up" />');

    $('.btn_up').click(function(){
        $('body').animate({
            'scrollTop': 0
        }, 1000);
        $('html').animate({
            'scrollTop': 0
        }, 1000);
    });

    $(window).scroll(function(){
        if ($(window).scrollTop() > 200) {
            $('.btn_up').addClass('active');
        } else {
            $('.btn_up').removeClass('active');
        }
    });

    //    Кнопка вверх (.btn_up) End


// Плавный скрол по якорям начало

    $(document).ready(function(){
        $("#menu").on("click","a", function (event) {
            //отменяем стандартную обработку нажатия по ссылке
            event.preventDefault();

            //забираем идентификатор бока с атрибута href
            var id  = $(this).attr('href'),

                //узнаем высоту от начала страницы до блока на который ссылается якорь
                top = $(id).offset().top;

            //анимируем переход на расстояние - top за 1500 мс
            $('body,html').animate({scrollTop: top}, 1500);
        });
    });

    // Плавный скрол по якорям конец



        $(document).foundation();

})(jQuery);