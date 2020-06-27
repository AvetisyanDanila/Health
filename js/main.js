// Активный класс у меню и плавная прокрутка для ХЕДЕРА
'use strict';
const headerHeight = document.querySelector('.header').offsetHeight;

function smoothScroll(target, duration) {
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - headerHeight + 80;
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

class NavigationMenu {
    constructor(root) {
        this.root = root;
        this.links = null;
        this.cacheNodes();
        this.bindEvents();
    }

    cacheNodes() {
        this.links = this.root.querySelectorAll('.js-page-scroll');
    }

    bindEvents() {
        document.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('js-page-scroll')) {
                event.preventDefault();
                const id = target.hash;

                smoothScroll(id, 1000);
            }
        });

        window.addEventListener("scroll", event => {
            let fromTop = window.scrollY + headerHeight;

            this.links.forEach(link => {
                let section = document.querySelector(link.hash);

                if (
                    section.offsetTop <= fromTop &&
                    section.offsetTop + section.offsetHeight > fromTop
                ) {
                    link.classList.add("menu__link_active");
                } else {
                    link.classList.remove("menu__link_active");
                }
            });
        });
    }
}

const menuNode = document.querySelector('.js-nav-menu');
const Menu = new NavigationMenu(menuNode);
//Плавная прокрутка и подсветка активного пункта меню
$("body").on('click', '[href*="#"]', function (e) {
    var fixed_offset = 0;
    $('html,body').stop().animate({
        scrollTop: $(this.hash).offset().top - fixed_offset
    }, 1000);
    e.preventDefault();
});
// Слайдер(About)
var swiper1 = new Swiper('.about-swiper', {
    slidesPerView: 1,
    spaceBetween: 35,
    loop: true,
    breakpoints: {
        992: {
            slidesPerView: 2,
        },
    },
    navigation: {
        nextEl: '.about__next',
        prevEl: '.about__prev',
    },
    simulateTouch: false
});
// Слайдер(Chefs)
var swiper1 = new Swiper('.chefs-swiper', {
    slidesPerView: 1,
    spaceBetween: 100,
    effect: "flip",
    flipEffect: {
        slideShadows: false,
        shadow: false,
    },
    speed: 1000,
    loop: true,
    navigation: {
        nextEl: '.chefs__next',
        prevEl: '.chefs__prev',
    },
    simulateTouch: false
});
// Затемнение хедера при скролле
if (document.documentElement.clientWidth > 768) {
    window.onscroll = function showHeader() {

        var header = document.querySelector('.header');

        if (window.pageYOffset > 1) {
            header.classList.add('active')
        } else {
            header.classList.remove('active')
        }

    }
}
// Табы рецептов
$(".recipes-link_first").click(function (e) {
    $(".recipes-tab_first").removeClass("d-none");
    $(".recipes-tab_second").addClass("d-none");
    $(".recipes-tab_third").addClass("d-none");
});
$(".recipes-link_second").click(function (e) {
    $(".recipes-tab_second").removeClass("d-none");
    $(".recipes-tab_first").addClass("d-none");
    $(".recipes-tab_third").addClass("d-none");
});
$(".recipes-link_third").click(function (e) {
    $(".recipes-tab_third").removeClass("d-none");
    $(".recipes-tab_second").addClass("d-none");
    $(".recipes-tab_first").addClass("d-none");
});
// Меню и бургер для телефонов
$(document).ready(function () {
    $(".header__burger").click(function (e) {
        $(".header__burger, .menu").toggleClass("active");
        $("body").toggleClass('lock');
    });
    $(".menu__item").click(function (e) {
        $(".header__burger").removeClass("active");
        $(".menu").removeClass("active");
        $("body").removeClass("lock");
    });
});