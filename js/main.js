import {
    advantagesScrollAnimation,
    reelBlockAnimation,
} from "./animation-setup.js";
import {
    hideSplineButton,
    hideVideoControls, initializeAnimationInChecker, initializeCursor,
    initializeLenis,
    initializeWindow,
    scaleToFit,
    zoom
} from "./common.js";

const initializeAnimations = () => {
    initializeAnimationInChecker();
    initializeLenis();
    advantagesScrollAnimation();
    reelBlockAnimation();
}

export const onPageLoaded = () => {
    const splineViewerInner = document.querySelector('#spline-viewer').shadowRoot;
    initializeWindow();

    // sorry spline(
    hideSplineButton(splineViewerInner);
    scaleToFit(splineViewerInner);
    hideVideoControls();

    initializeAccessoriesController(() => {
        if (window.innerWidth > 1024)
            initializeCursor();

        initializeDragSlider();
    });

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    initializeAnimations();
    animateWhiteGradient();
    parallaxAboutUs();

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
    const rectangle = document.querySelector(".us-rectangle")
    if (window.innerWidth > 1024)
        rectangle.style.transform = `translateX(${mouseX / 90}px) translateY(${mouseY / 90 - 220}px)`;

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
        document.querySelector('.reel-block').removeEventListener('click', closeVideo)
    }

    $('.reel-block').addClass('playing')
    $('.reel-block').removeClass('muted')

    const video = document.querySelector('.reel-video-placeholder')
    video.muted = false;
    video.loop = false;
    video.volume = 0.5;

    video.currentTime = 0;
    video.play()
    video.onended = closeVideo;
    video.onwaiting = () => {
        console.log('video loading')
        $('.loading').removeClass('hided')
    }
    video.onplaying = () => {
        document.querySelector('.reel-block').addEventListener('click', closeVideo)
        $('.loading').addClass('hided')
    }
}