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


    $('.sidebar .item, .contact_btn, .sidebar .logo, .phone').click(function(){
        var value = $(this).attr('value');
        console.log('button_clicked: ', value)
        gtag('event', 'click', { 'event_label': 'button_clicked', 'value': value });

        if(value.includes('resume') || value.includes('linkedin') || value.includes('github') || value.includes('github'))
            return;

        $('html, body').stop().animate({
            scrollTop: $("." + value).offset().top
        }, 1500);

        if(menuActive)
            closeMenu();
    });

    $('.loader').fadeOut(500 ,function(){
        $('.content, .sidebar').animate({
            opacity: 1
        }, 700);
    });

    var letters = $('.home .text-main h1, .home .text-main h2, .home .text-main h3');
    var time = 150;
    setTimeout(function(){
        letters.each(function(index) {
            setTimeout( function(){ 
                $(letters[index]).animate({
                    left: '0',
                    opacity: 1
                }, 450);
            }, time += 350 )
        });

        var items = $('.contact_btn, .home .text-secondary');
        time += 600;
        items.each(function(index) {
            setTimeout( function(){ 
                $(items[index]).animate({
                    opacity: 1
                }, 500);
            }, time += 350 )
        });
    }, 1200);

    if(device.mobile()) {
        $('.sidebar .hamburger_icon').click(function(){
            if(menuActive)
                closeMenu();
            else
                openMenu();
        })
    }

    $('.sidebar .lang_icon').click(function(){
        if(langMenuActive)
            closeLangMenu();
        else
            openLangMenu();
    })


    var form = document.getElementById('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('submit event')
        setTimeout(submitForm, 1000);

        var formSubmitted = false;
        function submitForm() {
          if (!formSubmitted) {
            console.log('form submitted')
            formSubmitted = true;
            form.submit();
          }
        }

        gtag('event', 'generate_lead', { 'event_callback': submitForm });
    });

    window.onscroll = function() {
        console.log('window.onscroll')
        if (document.body.scrollTop > 1200 || document.documentElement.scrollTop > 1200) {
            if(!mapIncluded)
            {
                loadMap();
            }
            else {
                window.onscroll = null;
            }
         }
    };

    $('.project-bottom-text a').click(function(){
        var value = $(this).attr('value');
        console.assert(value);
        console.log('project_hyperlink_clicked', value);
        gtag('event', 'click', { 'event_label': 'slide_hyperlink_clicked', 'value': value });
    })
}

var swiper = null;
var theaterItem = null;
var theaterActive = false;
var mapIncluded = false;
var menuActive = false;
var langMenuActive = false;
var menuAnimating = false;
var player = null;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('telloVideo', {
        events: {
            'onStateChange': onPlayerStateChange
          }
    });
}

function onPlayerStateChange(event) {
    var player_state;
    switch(event.data){
        case YT.PlayerState.PLAYING:
            player_state = 'playing';
            break;
        case YT.PlayerState.PAUSED:
            player_state = 'paused';
            break;
        case YT.PlayerState.ENDED:
            player_state = 'ended';
            break;
    }

    if(player_state) {
        console.log('youtube_statechanged', player_state)
        gtag('event', 'click', { 'event_label': 'youtube_statechanged', 'value': player_state });
    }
}

function openMenu() {
    if(menuAnimating) {
        return;
    }
    else if(langMenuActive) {
        closeLangMenu();
        setTimeout(openMenu , 450);
        return;
    }
        
    menuAnimating = true;
    $('.sidebar').animate({
        height: '100%',  
    }, 150 ,function (){
        $('.sidebar .menu').animate({
            opacity: '1',
        }, 220);
        menuAnimating = false;
    });

    console.log('openMenu')
    gtag('event', 'click', { 'event_label': 'open_menu' });
    menuActive = true;
}

function closeMenu() {
    if(menuAnimating) {
        return;
    }

    menuAnimating = true;
    $('.sidebar').animate({
        height: '56px',
    }, 200, function(){
        menuAnimating = false;
    });

    $('.sidebar .menu').animate({
        opacity: '0',
    }, 200);

    console.log('closeMenu')
    menuActive = false;
}

function openLangMenu() {
    if(menuAnimating) {
        return;
    }
    else if(menuActive) {
        closeMenu();
        setTimeout(openLangMenu , 450);
        return;
    }

    menuAnimating = true;
    $('.sidebar').animate({
        height: '110px',  
    }, 100 ,function (){
        $('.sidebar .lang_menu').animate({
            opacity: '1',
        }, 100, function(){
            menuAnimating = false;
        });
    });

    console.log('openLangMenu')
    gtag('event', 'click', { 'event_label': 'open_lang_menu' });

    langMenuActive = true;
}

function closeLangMenu() {
    if(menuAnimating) {
        return;
    }

    menuAnimating = true;
    $('.sidebar').animate({
        height: '56px',
    }, 350);

    $('.sidebar .lang_menu').animate({
        opacity: '0',
    }, 350 ,function(){
        menuAnimating = false;
    });

    console.log('closeLangMenu')
    langMenuActive = false;
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
    var value = $(item).attr('value');
    
    console.log('theater_clicked', value);
    gtag('event', 'click', { 'event_label': 'theater_mode', 'value': value });
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
    script.defer = true;
    script.add
 
    head.appendChild(script)
 }   

 function createFunctionWithTimeout(callback, opt_timeout) {
    var called = false;
    function fn() {
      if (!called) {
        called = true;
        callback();
      }
    }
    setTimeout(fn, opt_timeout || 1000);
    return fn;
}