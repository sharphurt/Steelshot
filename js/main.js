import {
    advantagesScrollAnimation,
    reelBlockAnimation,
} from "./animation-setup.js";

import {
    hideVideoControls, initializeAnimationInChecker, initializeCursor,
    initializeLenis,
    initializeWindow,
} from "./common.js";

const initializeAnimations = () => {
    initializeAnimationInChecker();
    initializeLenis();
    advantagesScrollAnimation();
    reelBlockAnimation();
}

export const onPageLoaded = () => {
    initializeWindow();
    hideVideoControls();

    initializeAccessoriesController('desktop', () => {
        if (window.innerWidth > 800)
            initializeCursor();

        initializeDragSlider();
    });

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    initializeAnimations();
    animateWhiteGradient();

    initializeSlick();
    parallaxAboutUs();

}
window.onresize = function () {
    initializeWindow()
}

const whiteGradient = document.querySelector(".gradient-cursor");

let mouseX = 0;
let mouseY = 0;

let ballX = 0;
let ballY = 0;

let speed = 0.1;
const animateWhiteGradient = () => {
    let distX = mouseX - ballX;
    let distY = mouseY - ballY;

    ballX = (ballX + (distX * speed));
    ballY = (ballY + (distY * speed));

    whiteGradient.style.left = ballX + "px";
    whiteGradient.style.top = ballY + "px";

    requestAnimationFrame(animateWhiteGradient);
}

function parallaxAboutUs() {
    var x = mouseX - $('.footer').offset().left;
    var y = mouseY - $('.footer').offset().top;
    const rectangle = document.querySelector(".us-rectangle")
    if (window.innerWidth > 1024)
        rectangle.style.transform = `translateX(${x / 80}px) translateY(${y / 80}px)`;

    requestAnimationFrame(parallaxAboutUs);
}

document.addEventListener("mousemove", function (event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
})

const initializeDragSlider = () => {
    const slider = document.querySelector('.slider-area');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 0.5; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
    });
}

export const playVideoReel = () => {
    const closeVideo = () => {
        console.log('close')

        $('.reel-block').removeClass('playing')
        $('.reel-block').addClass('muted')
        video.muted = true;
        video.loop = true;
        video.play();
        document.querySelector('.reel-close-cover').removeEventListener('click', closeVideo)
    }

    $('.reel-block').addClass('playing')
    $('.reel-block').removeClass('muted')

    const video = document.querySelector('.reel-video-main')
    const videoBg = document.querySelector('.reel-video-bg')
    video.muted = false;
    videoBg.muted = true;

    video.loop = false;
    video.volume = 0.5;

    video.currentTime = 0;
    videoBg.currentTime = 0;
    video.play()
    videoBg.play();

    video.onended = closeVideo;
    video.onwaiting = () => {
        console.log('video loading')
        $('.loading').removeClass('hided')
    }
    video.onplaying = () => {
        document.querySelector('.reel-close-cover').addEventListener('click', closeVideo)
        $('.loading').addClass('hided')
    }
}

const GetWindowViewPort = () => {
    return {
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    };
}

var viewPort = GetWindowViewPort();
const zoom = viewPort.width / 1440;
const initializeSlick = () => {
    $('.cameras-carousel').slick({
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        swipeToSlide: false,
        easing: 'easeInOut',
    });

    $(".cameras-carousel").find('.slick-slide').each(function () {
        $(this).on("click", function (e) {
            var target = $(e.target);
            if (target.is('button')) {
                const scrollPos = $(".accessories-block").offset().top + 1000;
                gsap.to(window, {duration: 2, ease: 'power4.inOut', scrollTo: scrollPos});
            } else if (!target.is('a'))
                $('.cameras-carousel').slick('slickGoTo', (this.attributes.number.value + 1) % 3, false)
        })
    })
}