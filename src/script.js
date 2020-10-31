$(function () {
    Init();

    var scrollPos = $(document).scrollTop();
    if(scrollPos)
        loadMap();
 });

function loadMap()
{
    mapIncluded = true;
    window.onscroll = null;
    include("https://maps.googleapis.com/maps/api/js?key=AIzaSyAScQpWWuRroGpbJRjIYboHrpCQr9vl_Ts&callback=initMap&libraries=&v=weekly")
}


function Init()
{
    console.log("Is Mobile: %s", device.mobile());
    particlesJS.load('particles', '../src/particles.json');

    $(".letter").hover(function () {
        $(this).addClass("animation-spin");
    });

    $(".letter, .bounce").bind("webkitAnimationEnd mozAnimationEnd animationend", function () {
        $(this).removeClass("animation-splat")
    });
    
    swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        centeredSlides: true,

        autoplay: {
            delay: 6000,
            disableOnInteraction: true
        },

        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      
        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: false,
          clickable: false,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
      });

    var typed = new Typed('#typed', {
        stringsElement: '#typed-strings',
        loop: true,
        smartBackspace:false,
        typeSpeed: 160,
        backSpeed: 120,
        backDelay: 1200,
        startDelay: 400,
    });

    swiper.on('slideChange', function () {
        if(theaterActive)
            closeTheater()

        if(player.getPlayerState() != -1)
            player.stopVideo();
    });

    $('.project-content').click(function(){
        if(theaterActive)
            closeTheater()
        else
            openTheater($(this))
    });

    $('.about, .contact').click(function(){
        closeTheater()
    });


    $('.sidebar .item, .contact_btn, .sidebar .logo').click(function(){
        var name = $(this).attr('value');
        if(!name) return;

        console.log('name:', name)
        $('html, body').stop().animate({
            scrollTop: $("." + name).offset().top
        }, 1500);

        if(menuActive)
            toggleMenu();
    });

    $('.loader').fadeOut(500 ,function(){
        $('.content, .sidebar').animate({
            opacity: 1
        }, 700);
    });

    var letters = $('.home .text-main h1, .home .text-main h2');
    var time = 150;
    setTimeout(function(){
        letters.each(function(index) {
            setTimeout( function(){ 
                $(letters[index]).css('opacity',1).addClass("animation-splat");
            }, time += 250 )
        });

        var items = $('.contact_btn, .home .text-secondary');
        time += 350;
        items.each(function(index) {
            setTimeout( function(){ 
                $(items[index]).css('opacity',1).addClass("animation-splat");
            }, time += 150 )
        });
    }, 1200);

    if(device.mobile()) {
        $('.sidebar .hamburger_menu').click(function(){
            toggleMenu();
        })
    }

    window.onscroll = function() {
        console.log('window.onscroll')
        if (document.body.scrollTop > 1200 || document.documentElement.scrollTop > 1200) {
            if(!mapIncluded)
            {
                loadMap();
            }
            else{
                window.onscroll = null;
            }
         }
    };
}

var swiper = null;
var theaterItem = null;
var theaterActive = false;
var mapIncluded = false;
var menuActive = false;
var player = null;


function onYouTubeIframeAPIReady() {
    player = new YT.Player('telloVideo');
}

function toggleMenu() {
    if(menuActive) {
        $('.sidebar').animate({
            height: '56px',
        }, 350);

        $('.sidebar .menu').animate({
            opacity: '0',
        }, 250);

        console.log('toggleMenu: ', true)
    }
    else {
        $('.sidebar').animate({
            height: '100%',  
        }, 120 ,function (){
            $('.sidebar .menu').animate({
                opacity: '1',
            }, 150);
        });

        console.log('toggleMenu: ', false)
    }

    menuActive = !menuActive;
}

function openTheater(item) {
    $('.overlay').css('display', 'block');

    $(item).prev().addClass('blur');   
    $('.swiper-pagination, .swiper-scrollbar, .swiper-button-next, .swiper-button-prev').addClass('blur'); 
    $(item).addClass("theater-mode");
    $('.portfolio').addClass('height'); 

    theaterItem = item;
    theaterActive = true;

    swiper.autoplay.stop();
}

function closeTheater() {
    $('.overlay').css('display', 'none');
      
    $(theaterItem).prev().removeClass('blur');   
    $(theaterItem).removeClass("theater-mode");
    $('.swiper-pagination, .swiper-scrollbar, .swiper-button-next, .swiper-button-prev').removeClass('blur'); 
    $('.portfolio').removeClass('height');   

    theaterItem = null;
    theaterActive = false;
    swiper.autoplay.start();
}

function include(filename) {
    var head = document.getElementsByTagName('head')[0];
 
    var script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';
    script.add
 
    head.appendChild(script)
 }   