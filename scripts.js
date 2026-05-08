// MENU MOBILE

const mobileBtn = document.getElementById("mobileBtn");
const menu = document.getElementById("menu");

mobileBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
});

// CAROUSEL

const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("dots");

let current = 0;

// CREAR DOTS

slides.forEach((_, index) => {

    const dot = document.createElement("div");

    dot.classList.add("dot");

    if(index === 0){
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        showSlide(index);
    });

    dotsContainer.appendChild(dot);

});

const dots = document.querySelectorAll(".dot");

// MOSTRAR SLIDE

function showSlide(index){

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    current = index;
}

// NEXT

document.getElementById("next").addEventListener("click", () => {

    current++;

    if(current >= slides.length){
        current = 0;
    }

    showSlide(current);

});

// PREV

document.getElementById("prev").addEventListener("click", () => {

    current--;

    if(current < 0){
        current = slides.length - 1;
    }

    showSlide(current);

});

// AUTOPLAY

setInterval(() => {

    current++;

    if(current >= slides.length){
        current = 0;
    }

    showSlide(current);

}, 5000);
