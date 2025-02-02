// Remove previous scroll handlers and replace with this new one
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add background when scrolled
    if (currentScroll > 50) {
        header.querySelector('.header-main').classList.add('scrolled');
    } else {
        header.querySelector('.header-main').classList.remove('scrolled');
    }

    // Hide/show header based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 150) {
        // Scrolling down
        header.classList.add('nav-up');
        header.classList.remove('nav-down');
    } else {
        // Scrolling up
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
    // close the navMenu by clicking outside
    menuOverlay.addEventListener("click", toggleNav);

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
        if (navMenu.classList.contains("open") && 
            !navMenu.contains(event.target) && 
            !openNavMenu.contains(event.target)) {
            toggleNav();
        }
    });

    // Prevent clicks inside menu from closing it
    navMenu.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    function toggleNav() {
        navMenu.classList.toggle("open");
        menuOverlay.classList.toggle("active");
        document.body.classList.toggle("hidden-scrolling");
        document.body.classList.toggle("menu-open"); // Add/remove class to body
    }

    navMenu.addEventListener("click", (event) =>{
        if(event.target.hasAttribute("data-toggle") && 
            window.innerWidth <= mediaSize){
            // prevent default anchor click behavior
            event.preventDefault();
            const menuItemHasChildren = event.target.parentElement;
          // if menuItemHasChildren is already expanded, collapse it
            if(menuItemHasChildren.classList.contains("active")){
                collapseSubMenu();
            }
            else{
            // collapse existing expanded menuItemHasChildren
            if(navMenu.querySelector(".menu-item-has-children.active")){
                collapseSubMenu();
            }
            // expand new menuItemHasChildren
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
         // if navMenu is open ,close it
            if(navMenu.classList.contains("open")){
                toggleNav();
            }
         // if menuItemHasChildren is expanded , collapse it
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

    // Defaultly active class is removed from all dots
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

    // Defaultly active class is removed from all dots
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

    // Defaultly active class is removed from all dots
    for (let i = 0; i < dots.length; i++) {
        const element = dots[i];
        element.classList.remove("dot-active");
    }

    slides.style.left = `-${slideIndex - 1}00%`;
    dots[slideIndex - 1].classList.add("dot-active");
}


let interval = setInterval(()=> {
    showslide();
} , 3000);   // Change every image after 3 seconds

slider.addEventListener("mouseover" , ()=> {
    clearInterval(interval);     // onHover Stop Changing every image after 3 seconds 
});

slider.addEventListener("mouseout" , ()=> {
    interval = setInterval(()=> {
        showslide();   
    } , 3000);    // on mouseout from slide then again start Changing every image after 3  seconds 
});

// Add touch functionality
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(interval); // Stop auto-slide on touch
}, false);

slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    // Restart auto-slide after touch
    interval = setInterval(() => {
        showslide();
    }, 3000);
}, false);

function handleSwipe() {
    const swipeDiff = touchStartX - touchEndX;
    if (Math.abs(swipeDiff) > 50) { // Min swipe distance
        if (swipeDiff > 0) {
            // Swipe left
            plusslide(1);
        } else {
            // Swipe right
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




//MODAL JS
// const openBtn1 = document.querySelector('#openBtn1');
// const closebtn1 = document.querySelector('#closeBtn1');
// const modal1 = document.querySelector('#modal1');

// const openBtn2 = document.querySelector('#openBtn2');
// const closebtn2 = document.querySelector('#closeBtn2');
// const modal2 = document.querySelector('#modal2');

// const openBtn3 = document.querySelector('#openBtn3');
// const closebtn3 = document.querySelector('#closeBtn3');
// const modal3 = document.querySelector('#modal3');

// const openBtn4 = document.querySelector('#openBtn4');
// const closebtn4 = document.querySelector('#closeBtn4');
// const modal4 = document.querySelector('#modal4');

// const openBtn5 = document.querySelector('#openBtn5');
// const closebtn5 = document.querySelector('#closeBtn5');
// const modal5 = document.querySelector('#modal5');

// const openBtn6 = document.querySelector('#openBtn6');
// const closebtn6 = document.querySelector('#closeBtn6');
// const modal6 = document.querySelector('#modal6');

// const openBtn7 = document.querySelector('#openBtn7');
// const closebtn7 = document.querySelector('#closeBtn7');
// const modal7 = document.querySelector('#modal7');

// const openBtn8 = document.querySelector('#openBtn8');
// const closebtn8 = document.querySelector('#closeBtn8');
// const modal8 = document.querySelector('#modal8');


// openBtn1.addEventListener('click' , () => {
//     modal1.style.display = 'flex';
//     document.body.style.overflow = "hidden";
// });
// closebtn1.addEventListener('click', () => {
//     modal1.style.display = 'none'
//     document.body.style.overflow = "auto";
// });

// window.addEventListener("click", function(event) {
// if (event.target == modal1) {
//     modal1.style.display = "none";
//     document.body.style.overflow = "auto";
// }
// })

// openBtn2.addEventListener('click' , () => {
//     modal2.style.display = 'flex';
//     document.body.style.overflow = "hidden";
// });
// closebtn2.addEventListener('click', () => {
//     modal2.style.display = 'none'
//     document.body.style.overflow = "auto";
// });
// window.addEventListener("click", function(event) {
// if (event.target == modal2) {
//     modal2.style.display = "none";
//     document.body.style.overflow = "auto";
// }
// })

// openBtn3.addEventListener('click' , () => {
//     modal3.style.display = 'flex';
//     document.body.style.overflow = "hidden";
// });
// closebtn3.addEventListener('click', () => {
//     modal3.style.display = 'none'
//     document.body.style.overflow = "auto";
// });
// window.addEventListener("click", function(event) {
// if (event.target == modal3) {
//     modal3.style.display = "none";
//     document.body.style.overflow = "auto";
// }
// })

// openBtn4.addEventListener('click' , () => {
//     modal4.style.display = 'flex';
//     document.body.style.overflow = "hidden";
// });
// closebtn4.addEventListener('click', () => {
//     modal4.style.display = 'none'
//     document.body.style.overflow = "auto";
// });
// window.addEventListener("click", function(event) {
// if (event.target == modal4) {
//     modal4.style.display = "none";
//     document.body.style.overflow = "auto";
// }
// })

// openBtn5.addEventListener('click' , () => {
//     modal5.style.display = 'flex';
//     document.body.style.overflow = "hidden";
// });
// closebtn5.addEventListener('click', () => {
//     modal5.style.display = 'none'
//     document.body.style.overflow = "auto";
// });
// window.addEventListener("click", function(event) {
// if (event.target == modal5) {
//     modal5.style.display = "none";
//     document.body.style.overflow = "auto";
// }
// })

// openBtn6.addEventListener('click' , () => {
//     modal6.style.display = 'flex';
//     document.body.style.overflow = "hidden";
// });
// closebtn6.addEventListener('click', () => {
//     modal6.style.display = 'none'
//     document.body.style.overflow = "auto";
// });
// window.addEventListener("click", function(event) {
// if (event.target == modal6) {
//     modal6.style.display = "none";
//     document.body.style.overflow = "auto";
// }
// })

// openBtn7.addEventListener('click' , () => {
//     modal7.style.display = 'flex';
//     document.body.style.overflow = "hidden";
// });
// closebtn7.addEventListener('click', () => {
//     modal7.style.display = 'none'
//     document.body.style.overflow = "auto";
// });
// window.addEventListener("click", function(event) {
// if (event.target == modal7) {
//     modal7.style.display = "none";
//     document.body.style.overflow = "auto";
// }
// })

// openBtn8.addEventListener('click' , () => {
//     modal8.style.display = 'flex';
//     document.body.style.overflow = "hidden";
// });
// closebtn8.addEventListener('click', () => {
//     modal8.style.display = 'none'
//     document.body.style.overflow = "auto";
// });
// window.addEventListener("click", function(event) {
// if (event.target == modal8) {
//     modal8.style.display = "none";
//     document.body.style.overflow = "auto";
// }
// })

//  MODAL JS