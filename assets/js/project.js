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



//MODAL JS
document.addEventListener('DOMContentLoaded', function() {
    const modalButtons = document.querySelectorAll('[data-modal-target]');
    const modalCloses = document.querySelectorAll('.modal-close');
    const modals = document.querySelectorAll('.modal');
    let activeModal = null;

    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget);
            if (modal) {
                openModal(modal);
            }
        });
    });

    modalCloses.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    modals.forEach(modal => {
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            closeModal(modal);
        });
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && activeModal) {
            closeModal(activeModal);
        }
    });

    function openModal(modal) {
        if (!modal || activeModal) return;
        activeModal = modal;
        
        modal.style.display = 'flex';
        document.body.classList.add('modal-open');
        
        void modal.offsetWidth;
        modal.classList.add('show');
        
        const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable) focusable.focus();
    }

    function closeModal(modal) {
        if (!modal) return;
        
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
        
        setTimeout(() => {
            modal.style.display = 'none';
            activeModal = null;
        }, 300);
    }
});
//MODAL JS