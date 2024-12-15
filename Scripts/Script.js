"use strict";
// [+] For High Performance
const $ = document;

// [+] Defining Variables
const overlay = $.querySelector(".overlay");
const themeToggleButton = $.querySelectorAll(".theme-toggle");
const mobileNav = $.querySelector(".mobile-nav");
const openNavButton = $.querySelector(".nav-button");
const closeNavButton = $.querySelector(".close-nav");
const submenuButton = $.querySelector(".submenu-button");
const subNavMenuController = $.querySelector(".nav-submenu-controller");
const submenu = $.querySelector(".submenu");
const cartOpenButton = $.querySelector(".shopping-cart-open-button");
const cartCloseButton = $.querySelector(".close-shopping-cart");
const shoppingCartMobile = $.querySelector(".shopping-cart-mobile");
const scrollTopBtn = $.querySelector(".scroll-top");

// [+] Slider Configuration
const swiper = new Swiper(".best-selling-products", {
    slidesPerView: 2,
    spaceBetween: 14,
    autoplay: {
        delay: 5000,
        disableOnInteraction: true
    },
    navigation: {
        nextEl: '.next-best-selling-product',
        prevEl: '.previous-best-selling-product',
    },
    breakpoints: {
        768: {
            slidesPerView: 3,
            spaceBetween: 18
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 20
        },
    }
});

// [+] Functions
function changeThemeHandler(){
    let localTheme = localStorage.getItem("golden-coffee-theme");

    if(localTheme){
        if(localTheme === "dark"){
            localStorage.setItem("golden-coffee-theme", "light");
            $.documentElement.classList.remove("dark");
        }else{
            localStorage.setItem("golden-coffee-theme", "dark");
            $.documentElement.classList.add("dark");
        }
    }else{
        localStorage.setItem("golden-coffee-theme", "dark");
    }
}

function getThemeFromLocal(){
    let localTheme = localStorage.getItem("golden-coffee-theme");
    if(localTheme){
        (localTheme === "dark") ? $.documentElement.classList.add("dark") : $.documentElement.classList.remove("dark");
    }
}

function openSubmenu(){
    submenu.classList.toggle("submenu--open");
    subNavMenuController.classList.toggle("nav-submenu-controller--active");
}

function showMobileSection(sectionType){
    let targetSection = (sectionType === "nav") ?  mobileNav : shoppingCartMobile;
    let activeClassName = targetSection.dataset.active ?? "";

    targetSection.classList.add(activeClassName);
    overlay.classList.add("overlay--active")
}

function hideMobileSection(sectionType) {
    if(sectionType){
        let targetSection = (sectionType === "nav") ?  mobileNav : shoppingCartMobile;
        let activeClassName = targetSection.dataset.active ?? "";
        targetSection.classList.remove(activeClassName);
    }else{
        mobileNav.classList.remove(`${mobileNav.dataset.active}`);
        shoppingCartMobile.classList.remove(`${shoppingCartMobile.dataset.active}`);
    }
    overlay.classList.remove("overlay--active");
}

function scrollTopHandler(){
    window.scrollTo(0, 0);
}

// [+] Events
window.addEventListener("load", getThemeFromLocal);
overlay.addEventListener("click", hideMobileSection.bind("", ""));
openNavButton.addEventListener("click", showMobileSection.bind("", "nav"))
closeNavButton.addEventListener("click", hideMobileSection.bind("", "nav"))
submenuButton.addEventListener("click", openSubmenu);
cartOpenButton.addEventListener("click", showMobileSection.bind("", "cart"));
cartCloseButton.addEventListener("click", hideMobileSection.bind("", "cart"));
scrollTopBtn.addEventListener("click", scrollTopHandler);

// [+] Array Event
themeToggleButton.forEach(btn => btn.addEventListener("click", changeThemeHandler));