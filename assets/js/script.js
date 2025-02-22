let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.querySelector('.header-main').classList.add('scrolled');
    } else {
        header.querySelector('.header-main').classList.remove('scrolled');
    }

    if (currentScroll > lastScroll && currentScroll > 150) {
        header.classList.add('nav-up');
        header.classList.remove('nav-down');
    } else {
        header.classList.remove('nav-up');
        header.classList.add('nav-down');
    }

    lastScroll = currentScroll;
});

//DROPDOWN MENU JS
(() =>{
    const openNavMenu = document.querySelector(".open-nav-menu"),
    closeNavMenu = document.querySelector(".close-nav-menu"),
    navMenu = document.querySelector(".nav-menu"),
    menuOverlay = document.querySelector(".menu-overlay"),
    mediaSize = 991;

    openNavMenu.addEventListener("click", toggleNav);
    closeNavMenu.addEventListener("click", toggleNav);
    menuOverlay.addEventListener("click", toggleNav);

    document.addEventListener("click", (event) => {
        if (navMenu.classList.contains("open") && 
            !navMenu.contains(event.target) && 
            !openNavMenu.contains(event.target)) {
            toggleNav();
        }
    });

    navMenu.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    function toggleNav() {
        navMenu.classList.toggle("open");
        menuOverlay.classList.toggle("active");
        document.body.classList.toggle("hidden-scrolling");
        document.body.classList.toggle("menu-open");
    }

    navMenu.addEventListener("click", (event) =>{
        if(event.target.hasAttribute("data-toggle") && 
            window.innerWidth <= mediaSize){
            event.preventDefault();
            const menuItemHasChildren = event.target.parentElement;
            if(menuItemHasChildren.classList.contains("active")){
                collapseSubMenu();
            }
            else{
            if(navMenu.querySelector(".menu-item-has-children.active")){
                collapseSubMenu();
            }
            menuItemHasChildren.classList.add("active");
            const subMenu = menuItemHasChildren.querySelector(".sub-menu");
            subMenu.style.maxHeight = subMenu.scrollHeight + "px";
            }
        }
    });
    function collapseSubMenu(){
        navMenu.querySelector(".menu-item-has-children.active .sub-menu")
        .removeAttribute("style");
        navMenu.querySelector(".menu-item-has-children.active")
        .classList.remove("active");
    }
    function resizeFix(){
            if(navMenu.classList.contains("open")){
                toggleNav();
            }
            if(navMenu.querySelector(".menu-item-has-children.active")){
                collapseSubMenu();
        }
    }

    window.addEventListener("resize", function(){
        if(this.innerWidth > mediaSize){
            resizeFix();
        }
    });
})();
//DROPDOWN MENU JS


//SLIDER JS
let slideIndex = 0;
let slider = document.querySelector(".slider");
let slides = document.querySelector(".slides");
let slide = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dots span")

showslide();

function plusslide(position) {
    slideIndex += position;

    if (slideIndex > slide.length) {
        slideIndex = 1;
    }
    else if (slideIndex < 1) {
        slideIndex = slide.length;
    }

    for (let i = 0; i < dots.length; i++) {
        const element = dots[i];
        element.classList.remove("dot-active");
    }

    slides.style.left = `-${slideIndex - 1}00%`;
    dots[slideIndex - 1].classList.add("dot-active");
}

function currentslide(index) {
    if (index > slide.length) {
        index = 1;
    }
    else if (index < 1) {
        index = slide.length;
    }

    for (let i = 0; i < dots.length; i++) {
        const element = dots[i];
        element.classList.remove("dot-active");
    }

    slides.style.left = `-${index - 1}00%`;
    dots[index - 1].classList.add("dot-active");

    slideIndex = index;
}

function showslide() {
    slideIndex++;

    if (slideIndex > slide.length) {
        slideIndex = 1;
    }
    else if (slideIndex < 1) {
        slideIndex = slide.length;
    }

    for (let i = 0; i < dots.length; i++) {
        const element = dots[i];
        element.classList.remove("dot-active");
    }

    slides.style.left = `-${slideIndex - 1}00%`;
    dots[slideIndex - 1].classList.add("dot-active");
}


let interval = setInterval(()=> {
    showslide();
} , 3000);  

slider.addEventListener("mouseover" , ()=> {
    clearInterval(interval);    
});

slider.addEventListener("mouseout" , ()=> {
    interval = setInterval(()=> {
        showslide();   
    } , 3000); 
});

let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(interval); 
}, false);

slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    interval = setInterval(() => {
        showslide();
    }, 3000);
}, false);

function handleSwipe() {
    const swipeDiff = touchStartX - touchEndX;
    if (Math.abs(swipeDiff) > 50) { 
        if (swipeDiff > 0) {
            plusslide(1);
        } else {
            plusslide(-1);
        }
    }
}
//SLIDER JS


// SCROLL UP
let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let progressValue = document.getElementById("progress-value");
    let pos = document.documentElement.scrollTop;
    let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if (pos > 100) {
    scrollProgress.style.display = "grid";
    } else {
    scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
    });
    scrollProgress.style.background = `conic-gradient(#0f4c5c ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;
// SCROLL UP