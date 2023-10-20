import {
    advantagesScrollAnimation,
    reelBlockAnimation,
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
}

export const onPageLoaded = () => {
    const splineViewerInner = document.querySelector('#spline-viewer').shadowRoot;
    initializeWindow();

    // sorry spline(
    hideSplineButton(splineViewerInner);
    scaleToFit(splineViewerInner);
    hideVideoControls();

    initializeAccessoriesController(() => {
        initializeCursor()
        initializeDragSlider()
    });

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    initializeAnimations();
    animateWhiteGradient();
}

const initializeCursor = () => {
    MouseFollower.registerGSAP(gsap);

    const cursor = new MouseFollower({
        iconSvgSrc: 'assets/cursors.svg',
        stateDetection: {
            '-pointer': 'a,button,.nav-card, input, #spline-viewer, .tech-info-header',
        }
    });

    cursor.setIcon('default')

    const pointerCursorTargets = document.querySelectorAll('a, button, .nav-card, input');
    pointerCursorTargets.forEach((e) => {
        e.addEventListener('mouseover', () => {
            cursor.setIcon('pointer');
        });

        e.addEventListener('mouseleave', () => {
            cursor.setIcon('default')
        });
    })

    const slidingCursorTargets = document.querySelectorAll('#spline-viewer')
    slidingCursorTargets.forEach((e) => {
        e.addEventListener('mouseover', () => {
            cursor.setIcon('slide');
        });

        e.addEventListener('mouseleave', () => {
            cursor.setIcon('default')
        });
    })

    const draggingCursorTargets = document.querySelectorAll('.slider-area')
    draggingCursorTargets.forEach((e) => {
        e.addEventListener('mouseover', () => {
            cursor.setIcon('drag');
        });

        e.addEventListener('mouseleave', () => {
            cursor.setIcon('default')
        });
    })
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
        console.log(walk);
    });
}