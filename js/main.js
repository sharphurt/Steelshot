import {
    advantagesScrollAnimation,
    GetWindowViewPort,
    reelBlockAnimation,
    slideInAnimation
} from "./animation-setup.js";
import {
    hideSplineButton,
    hideVideoControls, initializeAnimationInChecker,
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

    animateCursor();
}

export const onPageLoaded = () => {
    const splineViewerInner = document.querySelector('#spline-viewer').shadowRoot;
    initializeWindow();

    // sorry spline(
    hideSplineButton(splineViewerInner);
    scaleToFit(splineViewerInner);
    hideVideoControls();

    initializeAccessoriesController();

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    initializeAnimations();

}

const ball = document.querySelector(".gradient-cursor");

let mouseX = 0;
let mouseY = 0;

let ballX = 0;
let ballY = 0;

let speed = 0.1;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function animateCursor() {
    var block = $('.typography-block');

    var relX = (mouseX - block.offset().left) / zoom
    var relY = clamp((mouseY - block.offset().top) / zoom, 0, block.height());

    let distX = relX - ballX;
    let distY = relY - ballY;

    ballX = (ballX + (distX * speed));
    ballY = (ballY + (distY * speed));

    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    requestAnimationFrame(animateCursor);
}

document.addEventListener("mousemove", function (event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
})